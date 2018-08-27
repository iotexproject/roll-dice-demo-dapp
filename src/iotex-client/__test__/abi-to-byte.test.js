import test from 'ava';
import {encodeArguments, encodeInputData, getAbiFunctions, getHeaderHash} from '../abi-to-byte';

test('getAbiFunctions', async t => {
  const solFile = './src/iotex-client/RollDice.sol';
  const contractName = ':RollDice';
  const abiFunctions = getAbiFunctions({solFile, contractName});
  t.deepEqual({
    rollAward: {
      constant: false,
      inputs: [
        {
          name: 'requestId',
          type: 'string',
        },
        {
          name: 'target',
          type: 'address',
        },
      ],
      name: 'rollAward',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    roll: {
      constant: true,
      inputs: [
        {
          name: 'requestId',
          type: 'string',
        },
      ],
      name: 'roll',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    deposit: {
      constant: false,
      inputs: [],
      name: 'deposit',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
  }, abiFunctions);
});

test('encodeArguments', async t => {
  const encoded = encodeArguments(
    [
      {name: 'requestId', type: 'string'}],
    {
      requestId:
        '123',
    }
  );
  t.deepEqual('000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000033132330000000000000000000000000000000000000000000000000000000000', encoded);
});

test('getHeaderHash', async t => {
  const fn = {
    constant: false,
    inputs: [{name: 'requestId', type: 'string'}],
    name: 'rollAward',
    outputs: [{name: '', type: 'uint256'}],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  };
  const args = [{name: 'requestId', type: 'string'}];
  const hash = getHeaderHash(fn, args);
  t.deepEqual('7341e13c', hash);
});

test('encodeInputData', async t => {
  const abiFunctions = {
    rollAward: {
      constant: false,
      inputs: [{name: 'requestId', type: 'string'}, {name: 'target', type: 'address'}],
      name: 'rollAward',
      outputs: [{name: '', type: 'uint256'}],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    roll: {
      constant: true,
      inputs: [{name: 'requestId', type: 'string'}],
      name: 'roll',
      outputs: [{name: '', type: 'uint256'}],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    deposit: {
      constant: false,
      inputs: [{name: '_id', type: 'bytes32'}],
      name: 'deposit',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
  };
  const fnName = 'rollAward';
  const userInput = {requestId: '123213', target: 'io1qyqsyqcy222ggazmccgf7dsx9m9vfqtadw82ygwhjnxtmx'};
  const encoded = encodeInputData(abiFunctions, fnName, userInput);
  t.deepEqual('1e67bed800000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000f8f66872162313784205171b99fd14f9d00000000000000000000000000000000000000000000000000000000000000063132333231330000000000000000000000000000000000000000000000000000', encoded);
});
