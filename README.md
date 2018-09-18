# roll-dice-demo-dapp

This is a demo of web DApp based on [IoTeX blockchain](https://iotexscan.io/). You can see the site [here](https://rolldicedapp.herokuapp.com).

## Setup Development Environment

Download roll-dice-demo-app code

```bash
git clone git@github.com:iotexproject/roll-dice-demo-dapp.git
```

And install node version manager by following instructions [here](https://github.com/creationix/nvm#installation). Or if
you have

```bash
nvm use 8.11.4
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
And visit [[http://localhost:4102]]


## Deploy

```bash
npm run build-production
NODE_ENV=production npm run start
```
