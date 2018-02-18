//simple ether transfer script from one account to another using privateKey

const {
  web3,
  provider,

  toHex,
  toWei,

  loadContract,
  solc,

  EthereumTx
} = require('../helpers')

global.web3 = web3
global.provider = provider
global.toHex = toHex
global.toWei = toWei
global.loadContract = loadContract
global.solc = solc
global.EthereumTx = EthereumTx

// ethereumjs-tx
global.privateKey = Buffer.from(
  '{private-key-goes-here}',
  'hex'
)

global.publicKey = web3.eth.accounts.privateKeyToAccount(
  `0x${privateKey.toString('hex')}`
).address


global.ethTx = {
  //nonce is the 'transaction sequence'
  nonce: '0x00',

  gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
  gasLimit: web3.utils.toHex('200000'),

  to: recipient,
  value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),

  // EIP 155 chainId - mainnet: 1, ropsten: 3
  chainId: 3
}

//create transaction
const tx = new EthereumTx(ethTx)

//sign transaction
tx.sign(privateKey)

//send tx to chain
web3.eth
  .sendSignedTransaction(`0x${tx.serialize().toString('hex')}`)
  // could take some time to be mined
  .on('receipt', console.log)

// Start repl
require('repl').start({})
