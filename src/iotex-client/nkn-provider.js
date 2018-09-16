// @flow
import nkn from 'nkn-client';
import type {Provider, Request} from './provider';

export class NknProvider implements Provider {
  client: any;
  providerAddr: any;

  constructor({providerAddr}: any) {
    this.providerAddr = providerAddr;
    this.client = nkn({
      responseTimeout: 5,
      identifier: 'iotex-dtracker-demo-client',
      privateKey: 'c504710fe2d78976bf29621f63a845e3f087903764cfcd19791bdf7e6a086395',
    });
  }

  async send(request: Request) {
    return new Promise((resolve, reject) => {
      this.client.on('connect', err => {
        if (err) {
          reject(err);
        }

        resolve(this.client.send(this.providerAddr, JSON.stringify(request)));
      });
    });
  }
}
