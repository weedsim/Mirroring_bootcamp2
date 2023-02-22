// 개인키 : f8f8a2f43c8376ccb0871305060d7b27b0554d2cc72bccf41b2705608452f315

const { Transaction: EthereumTx } = require('ethereumjs-tx'); //instead of rlp
const { toWei } = require('web3-utils');
const util = require('ethereumjs-util');

const input = process.argv[2];

async function createTransaction() {
    // Set the web3 provider endpoint
    const Web3 = require('web3');
    const web3 = new Web3('https://rpc.sepolia.org');
    
    // Define transaction parameters
    const txParams = {
      nonce: '0x0',
      gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
      gasLimit: '0x746a528', // 30000000 in hex
      to: '0x001d3f1ef827552ae114027bd3ecf1f086ba0f9',  //direct
      value: web3.utils.toHex(toWei('0.01', 'ether')),  //0.001 eth
      data: '0x', //null
    };
    
    // Create a new transaction object
    const tx = new EthereumTx(txParams, { 'chain': 'mainnet' });
    
    // Sign the transaction using a private key
    const privateKey = util.keccak256(Buffer.from(input, 'hex'));
    console.log(privateKey)
    tx.sign(privateKey);
    
    // Get the serialized transaction and log it
    const serializedTx = tx.serialize();
    console.log('Serialized transaction: ', serializedTx.toString('hex'));
}

createTransaction();