import {createRateLimiter} from 'onefx/lib/middleware/rate-limiter-middleware';
import {logger} from 'onefx/lib/integrated-gateways/logger';
import bodyParser from 'koa-bodyparser';

export function diceRolling(server) {
  return async ctx => {
    try {
      const txHash = await server
        .gateways
        .iotex
        .methods
        .rollAward(String(Date.now()),
          ctx.request.body.address);
      logger.debug(`txHash is ${txHash}`);

      const chance = 5;
      const point = 4;
      const dicePoint = 6;
      return ctx.response.body = {
        ok: true,
        chance: chance - 1,
        point,
        dicePoint,
      };
    } catch (e) {
      logger.error(`failed to roll dice ${e.stack}`);
      return ctx.response.body = {
        ok: false,
        error: e.message,
      };
    }
  };
}

export function setHomeHandlers(server) {
  // per user per endpoint
  const rateLimiterFactory = (endpoint, interval, max) => createRateLimiter(
    server,
    {
      interval: {min: interval},
      max,
      generateKey: ctx => `${endpoint}-${ctx.body && ctx.body.address}`,
    },
  );

  server.post(
    'activity.dice_rolling',
    '/activity/roll-dpos/dice-rolling/',
    bodyParser(),
    rateLimiterFactory('activity.dice_rolling', 30, 12), // per user per 30 min 12 times max
    diceRolling(server),
  );
}
