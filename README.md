# Roll Dice Demo DApp

This is a demo of web DApp based on [IoTeX blockchain](https://iotexscan.io/). You can visit the site [here](https://rolldicedapp.herokuapp.com).

## Setup Development Environment

Download the source code

```bash
git clone git@github.com:iotexproject/roll-dice-demo-dapp.git
```

Then install node version manager by following instructions [here](https://github.com/creationix/nvm#installation).  Alternatively, if
you have nvm already.

```bash
nvm use 8.11.4
```

Install dependencies.

```bash
npm install
```

Prepare environment variable for the configuration.

```bash
cp ./.env.tmpl ./.env
```

## Develop

```bash
npm run watch
```

Visit http://localhost:4102


## Deploy

```bash
npm run build-production
NODE_ENV=production npm run start
```
