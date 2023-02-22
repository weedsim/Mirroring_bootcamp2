//콘솔에 입력한거 가져오기
const input = process.argv[2];

const EC = require('elliptic').ec;
const keccak_256 = require('web3-utils').keccak256;
const ec = new EC('secp256k1');

const keyPair = ec.keyFromPrivate(input);

// get the public key as a hex string (without the prefix '04')
const publicKey = keyPair.getPublic(false, 'hex');

// compute the Ethereum address from the public key
const address = "0x" + keccak_256("0x" + publicKey.slice(2)).slice(26);

console.log('Public key: ' + publicKey);
console.log('address: ' + address);
