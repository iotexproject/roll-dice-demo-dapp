// @flow
import axios from 'axios';
import {get} from 'dotty';
import {encodeInputData, getAbiFunctions} from './abi-to-byte';

type Opts = {
  providerUrl: string,
  timeout: number,
  solFile: string,
  contractName: string,
  contractAddress: string,
  wallet: {
    publicKey: string,
    privateKey: string,
    rawAddress: string,
  },
};

type RawTransaction = {
  byteCode: string,
  nonce: number,
  gasLimit: string,
  version: number,
  contract: string, // address
}

export class IotexClient {
  opts: Opts;
  axios: any;
  _abiFunctions: any;

  methods: { [funcName: string]: any };

  constructor(opts: Opts) {
    this.opts = opts;
    this.axios = axios.create({
      baseURL: opts.providerUrl,
      timeout: opts.timeout || 100000,
    });
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
          if (!resp.ok) {
            throw new Error(`cannot signContractAbi: ${JSON.stringify(resp)}`);
          }

          const {ok, hash} = await this._sendTransaction(resp.rawTransaction);
          if (!ok) {
            throw new Error('cannot sendTransaction');
          }
          return hash;
        };
      }
    }
  }

  async _signContractAbi({data, value}: { data: string, value: number }) {
    const request = {
      rawTransaction: {
        byteCode: data,
        nonce: await this.getLatestNonce(this.opts.wallet.rawAddress),
        gasLimit: '1000000',
        version: 1,
        amount: value,
        contract: this.opts.contractAddress,
      },
      wallet: this.opts.wallet,
    };
    return (await this.axios.post('/wallet/transaction/signContractAbi', request)).data;
  }

  async _sendTransaction(rawTransaction: RawTransaction) {
    // convert args address to 20 bytes
    const request = {
      rawTransaction,
      type: 'contract',
    };
    return (await this.axios.post('/wallet/transaction/sendTransaction', request)).data;
  }

  async getLatestNonce(address: string) {
    const resp = await this.axios.post('/getAddressId', {id: address});
    return resp && resp.data.address && resp.data.address.pendingNonce;
  }
}
