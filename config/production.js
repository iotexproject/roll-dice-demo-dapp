import process from 'global/process';

module.exports = {
  server: {
    cookie: {
      secrets: JSON.parse(process.env.COOKIE_SECRETS),
    },
  },
  gateways: {
    logger: {
      level: 'info',
    },
  },
};
