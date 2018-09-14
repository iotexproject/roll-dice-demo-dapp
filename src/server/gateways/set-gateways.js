import {IotexClient} from '../../iotex-client';
import {JsonRpcProvider} from '../../iotex-client/provider';

export function setGateways(server) {
  server.gateways = server.gateways || {};
  server.gateways.iotex = new IotexClient({
    provider: new JsonRpcProvider({url: server.config.providerUrl}),
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
