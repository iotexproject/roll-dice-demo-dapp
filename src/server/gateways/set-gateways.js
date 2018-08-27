import {IotexClient} from '../../iotex-client';

export function setGateways(server) {
  server.gateways = server.gateways || {};
  server.gateways.iotex = new IotexClient({
    providerUrl: server.config.providerUrl,
    timeout: 100000,
    solFile: './src/iotex-client/RollDice.sol',
    contractName: ':RollDice',
    contractAddress: server.config.contractAddress,
    wallet: {
      publicKey: server.config.walletPublicKey,
      privateKey: server.config.walletPrivateKey,
      rawAddress: server.config.walletRawAddress,
    },
  });
}
