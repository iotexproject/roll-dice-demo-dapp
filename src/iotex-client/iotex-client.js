// @flow
import {get} from 'dotty';
import type {Provider} from './provider';
import {encodeInputData, getAbiFunctions} from './abi-to-byte';

const NONCE_DELTA = 10;

type Opts = {
  provider: Provider,
  solFile: string,
  contractName: string,
  contractAddress: string,
  wallet: {
    publicKey: string,
    privateKey: string,
    rawAddress: string,
  },
};

type SignedTransaction = {
  version: number,
  nonce: number,
  signature: string,
  executor: string,
  contract: string,
  executorPubKey: string,
  gas: number,
  gasPrice: number,
  data: string,
  ID: string,
  amount: number,
  blockID: string,
  isPending: boolean,
  timestamp: number,
};

export class IotexClient {
  opts: Opts;
  provider: any;
  _abiFunctions: any;

  methods: { [funcName: string]: any };

  constructor(opts: Opts) {
    this.opts = opts;
    this.provider = opts.provider;
    this._abiFunctions = getAbiFunctions({solFile: opts.solFile, contractName: opts.contractName});

    // mount methods
    this.methods = {};
    for (const func in this._abiFunctions) {
      if (this._abiFunctions.hasOwnProperty(func)) {
        this.methods[func] = async(...args) => {
          const abiFunc = this._abiFunctions[func];
          const userInput = {};
          if (!abiFunc.inputs || !Array.isArray(abiFunc.inputs)) {
            return userInput;
          }
          abiFunc.inputs.map((val, i) => {
            userInput[val.name] = args[i];
          });

          const data = encodeInputData(this._abiFunctions, func, userInput);
          const value = get(args, `${args.length - 1}.value`);
          const resp = await this._signContractAbi({data, value});
          if (resp.error) {
            throw new Error(`cannot signContractAbi: ${JSON.stringify(resp.error)}`);
          }

          const {error, result} = await this._sendTransaction(resp.result.signedTransaction);
          if (error) {
            throw new Error(`cannot sendTransaction: ${JSON.stringify(error)}`);
          }
          return result.hash;
        };
      }
    }
  }

  async _signContractAbi({data, value}: { data: string, value: number }) {
    const nonce = await this.getLatestNonce(this.opts.wallet.rawAddress) + NONCE_DELTA;
    const request = {
      rawTransaction: {
        byteCode: data || '',
        nonce: nonce || 0,
        gasLimit: '1000000',
        version: 1,
        amount: value || 0,
        contract: this.opts.contractAddress,
      },
      wallet: this.opts.wallet,
    };
    return await this.provider.send({method: 'JsonRpc.signContractAbi', params: [request]});
  }

  async _sendTransaction(transaction: SignedTransaction) {
    const request = {
      signedTransaction: transaction,
      type: 'contract',
    };
    return await this.provider.send({method: 'JsonRpc.sendTransaction', params: [request]});
  }

  async getLatestNonce(address: string) {
    const resp = await this.provider.send({
      method: 'JsonRpc.getAddressId',
      params: [{id: address}],
    });
    return (resp && resp.result && resp.result.pendingNonce) || 0;
  }
}
