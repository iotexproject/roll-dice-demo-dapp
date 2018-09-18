import process from 'global/process';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  project: 'roll-dice-demo-dapp',
  server: {
    port: process.env.PORT || 4102,
    staticDir: './dist',
    delayInitMiddleware: false,
    cookie: {
      secrets: ['insecure plain text', 'insecure secret here'],
    },
  },
  gateways: {
    logger: {
      enabled: true,
      level: 'debug',
    },
  },
  analytics: {
    googleTid: 'UA-111756489-4',
  },
  csp: {
    'default-src': [
      'none',
    ],
    'style-src': [
      'self',
      'unsafe-inline',
      'https://fonts.googleapis.com/css',
      'https://use.fontawesome.com/releases/v5.0.13/',
      'https://translate.googleapis.com/',
      'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/',
      'https://checkout.stripe.com/v3/',
    ],
    'frame-src': [
      'https://www.slideshare.net/',
      'https://checkout.stripe.com/',
    ],
    'connect-src': [
      'self',
      'https://checkout.stripe.com/api/',
    ],
    'child-src': [
      'self',
    ],
    'font-src': [
      'self',
      'https://fonts.gstatic.com/',
      'https://use.fontawesome.com/releases/v5.0.13/',
      'data: https://use.fontawesome.com/releases/v5.0.13/',
    ],
    'img-src': [
      '*',
    ],
    'media-src': [
      'self',
    ],
    'object-src': [
      'self',
    ],
    'script-src': [
      'self',
      'https://www.google-analytics.com/',
      'https://translate.google.com/',
      'https://translate.googleapis.com/',
      'https://cdn.jsdelivr.net/particles.js/2.0.0/',
      'https://checkout.stripe.com/checkout.js',
    ],
  },
  providerUrl: process.env.PROVIDER_URL,
  contractAddress: process.env.CONTRACT_ADDRESS,
  accounts: JSON.parse(process.env.ACCOUNTS),
};
