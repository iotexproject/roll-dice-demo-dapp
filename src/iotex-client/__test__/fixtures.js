/* eslint-disable no-unused-vars */
// http://localhost:4004/api/wallet/transaction/signContractAbi
// request
const a = {
  rawTransaction: {
    byteCode: '7341e13c000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000053132333133000000000000000000000000000000000000000000000000000000',
    nonce: 1,
    gasLimit: '1000000',
    version: 1,
    contract: 'io1qyqsyqcyw4njhck90fc34q3hh8u3yu8elu4efnca5re0s4',
  },
  wallet: {
    publicKey: '7339be67676c3fca28db982a7ba8a741a17fe8c417a4b070fa19926ffe361d23cdddf70020fd0c51140ab65c8ff71499f2dafc581a131dd68bed78e34c185a32542363eb70f9ab02',
    privateKey: '1c285ea35c5b0ba56b77cc692285540bf4477933bd4233a03a82540d0c883bb95db0f000',
    rawAddress: 'io1qyqsyqcyj4kpylnnaa7euqxzh5tzqxkaqggkrl9dqmavv2',
  },
};
// response
const b = {
  ok: true,
  rawTransaction: {
    version: 1,
    nonce: 1,
    signature: '8ec9aa425bdd5033194bfdc462d4fee3ea69c41d02399f05a5a2b2500bb48e700def2c00aab728edc846bf1eed6e77b5b1a42cf8526d895dc877a7af3d27c17f88ce38cbe9bdc701',
    executor: 'io1qyqsyqcyj4kpylnnaa7euqxzh5tzqxkaqggkrl9dqmavv2',
    contract: 'io1qyqsyqcyw4njhck90fc34q3hh8u3yu8elu4efnca5re0s4',
    executorPubKey: '7339be67676c3fca28db982a7ba8a741a17fe8c417a4b070fa19926ffe361d23cdddf70020fd0c51140ab65c8ff71499f2dafc581a131dd68bed78e34c185a32542363eb70f9ab02',
    gas: 1000000,
    gasPrice: 0,
    data: '7341e13c000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000053132333133000000000000000000000000000000000000000000000000000000',
    ID: '',
    amount: 0,
    blockID: '',
    isPending: false,
    timestamp: 0,
  },
};

//  http://localhost:4004/api/wallet/transaction/sendTransaction
// request
const c = {
  rawTransaction: {
    version: 1,
    nonce: 1,
    signature: '8ec9aa425bdd5033194bfdc462d4fee3ea69c41d02399f05a5a2b2500bb48e700def2c00aab728edc846bf1eed6e77b5b1a42cf8526d895dc877a7af3d27c17f88ce38cbe9bdc701',
    executor: 'io1qyqsyqcyj4kpylnnaa7euqxzh5tzqxkaqggkrl9dqmavv2',
    contract: 'io1qyqsyqcyw4njhck90fc34q3hh8u3yu8elu4efnca5re0s4',
    executorPubKey: '7339be67676c3fca28db982a7ba8a741a17fe8c417a4b070fa19926ffe361d23cdddf70020fd0c51140ab65c8ff71499f2dafc581a131dd68bed78e34c185a32542363eb70f9ab02',
    gas: 1000000,
    gasPrice: 0,
    data: '7341e13c000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000053132333133000000000000000000000000000000000000000000000000000000',
    ID: '',
    amount: 0,
    blockID: '',
    isPending: false,
    timestamp: 0,
  },
  type: 'contract',
};
// response
const d = {ok: true, hash: '39400c2efa530efb494debc796b3327bcf7aed24c813ea4ead57f99aaa76b0b1'};
