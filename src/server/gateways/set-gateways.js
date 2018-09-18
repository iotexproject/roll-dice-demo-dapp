// @flow
import {IotexClient, JsonRpcProvider} from 'iotex-client-js';

class IotexClientPool {
  clients: any;
  cur: number;
  len: number;

  constructor({providerUrl, contractAddress, accounts}) {
    this.len = accounts.length;
    this.clients = accounts.map(acc => (new IotexClient({
      provider: new JsonRpcProvider({url: providerUrl}),
      solFile: './src/RollDice.sol',
      contractName: ':RollDice',
      contractAddress,
      wallet: {
        publicKey: acc.PublicKey,
        privateKey: acc.PrivateKey,
        rawAddress: acc.RawAddress,
      },
    })));
    this.cur = 0;
  }

  get next() {
    this.cur += 1;
    this.cur = this.cur % this.len;
    return this.clients[this.cur];
  }

  get methods() {
    return this.next.methods;
  }

  async getReceiptByExecutionId(txHash) {
    this.cur += 1;
    this.cur = this.cur % this.len;
    return await this.next.getReceiptByExecutionId(txHash);
  }
}

export function setGateways(server: any) {
  server.gateways = server.gateways || {};

  // using a pool to interact with iotex core for scaling nonce.
  server.gateways.iotex = new IotexClientPool(server.config);
}
