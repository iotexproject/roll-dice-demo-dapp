import fs from 'fs';
import path from 'path';
import ethereumjs from 'ethereumjs-abi';
import hash from 'js-sha3';
import solc from 'solc';
import {decodeAddress} from './decode-address';

export function getAbiFunctions({solFile, contractName}) {
  const input = fs.readFileSync(path.resolve(solFile));
  const output = solc.compile(input.toString(), 1);
  const abi = JSON.parse(output.contracts[contractName].interface);

  const abiFunctions = {};
  abi.forEach(f => {
    if (f.type === 'function') {
      abiFunctions[f.name] = f;
    }
  });

  return abiFunctions;
}

function getArgTypes(fn) {
  const args = [];
  fn.inputs.forEach(field => {
    args.push({name: field.name, type: field.type});
  });
  return args;
}

export function getHeaderHash(fn, args) {
  const inputs = args.map(i => {
    return i.type;
  });
  const signature = `${fn.name}(${inputs.join(',')})`;
  const keccak256 = hash.keccak256(signature);
  return keccak256.slice(0, 8);
}

export function encodeArguments(args, userInput) {
  const types = [];
  const values = [];

  (args || []).forEach(arg => {
    types.push(arg.type);
    if (arg.name in userInput) {
      let value = userInput[arg.name];
      if (arg.type === 'address') {
        value = decodeAddress(value);
      }
      values.push(value);
    } else {
      values.push('');
    }
  });

  const encoded = ethereumjs.rawEncode(types, values);
  return encoded.toString('hex');
}

export function encodeInputData(abiFunctions, fnName, userInput) {
  const fn = abiFunctions[fnName];
  const args = getArgTypes(fn);
  const header = getHeaderHash(fn, args);
  const encodedArgs = encodeArguments(args, userInput);
  return `${header}${encodedArgs}`;
}
