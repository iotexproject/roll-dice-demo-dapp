/* eslint-disable no-console,no-undef */
import {createRateLimiter} from 'onefx/lib/middleware/rate-limiter-middleware';
import {logger} from 'onefx/lib/integrated-gateways/logger';
import bodyParser from 'koa-bodyparser';

export function diceRolling(server) {
  server
    .gateways
    .iotex
    .methods
    .deposit({value: 1000})
    .then(r => logger.info(`deposit successfully, txHash is ${r}`))
    .catch(err => logger.error(`failed to call deposit ${err.stack}`));

  return async ctx => {
    try {
      const txHash = await server
        .gateways
        .iotex
        .methods
        .rollAward(String(Date.now()), ctx.request.body.address);
      logger.debug(`txHash is ${txHash}`);

      return ctx.response.body = {
        ok: true,
        chance: ctx.request.body.chance - 1,
        txHash,
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

function fetchDiceResult(server) {
  return async ctx => {
    const txHash = ctx.request.body.hash;
    const receipt = await server.gateways.iotex.getReceiptByExecutionId(txHash);
    if (receipt && receipt.status) {
      const point = parseInt(receipt.returnValue, 16);
      const dicePoint = point;
      return ctx.response.body = {
        ok: true,
        point,
        dicePoint,
      };
    }
    return ctx.response.body = {
      ok: false,
      error: 'The execution was failed or not mined.',
    };
  };
}

export function setHomeHandlers(server) {
  // per user per endpoint
  const rateLimiterFactory = (endpoint, interval, max) => createRateLimiter(
    server,
    {
      limiterName: endpoint,
      interval: {sec: interval},
      max,
      generateKey: ctx => `${endpoint}-${ctx.body && ctx.body.address}`,
    },
  );

  server.post(
    'activity.fetch_dice_result',
    '/activity/roll-dpos/fetch-dice-result/',
    bodyParser(),
    rateLimiterFactory('activity.fetch_dice_result', 10, 1),
    fetchDiceResult(server),
  );
  server.post(
    'activity.dice_rolling',
    '/activity/roll-dpos/dice-rolling/',
    bodyParser(),
    rateLimiterFactory('activity.dice_rolling', 10, 1),
    diceRolling(server),
  );
}
