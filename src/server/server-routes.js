// @flow

import type {Server} from 'onefx/lib/server';
import {noopReducer} from 'onefx/lib/iso-react-render/root/root-reducer';
import {AppContainer} from '../shared/app-container';
import {setHomeHandlers} from '../shared/home/home-handler';

export function setServerRoutes(server: Server) {
  // Health checks
  server.get('health', '/health', function onHealth(ctx) {
    ctx.body = 'OK';
  });

  setHomeHandlers(server);

  server.get('SPA', '/*', function onRoute(ctx) {
    ctx.setState('activity.rollDPoS', {
      chance: 5,
    });
    ctx.body = ctx.isoReactRender({
      VDom: (
        <AppContainer/>
      ),
      reducer: noopReducer,
      clientScript: '/main.js',
    });
  });
}
