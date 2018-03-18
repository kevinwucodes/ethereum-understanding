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

//////////////////////////////////////

global.rawSources = {
  'oraclize0.4.sol': loadContract('./contracts/oraclize0.4.sol'),
  'FuelPrice.sol': loadContract('./contracts/FuelPrice.sol')
}

global.compiled = solc.compile({ sources: rawSources })

global.abi = JSON.parse(compiled.contracts['FuelPrice.sol:FuelPrice'].interface)
global.bytecode = compiled.contracts['FuelPrice.sol:FuelPrice'].bytecode

///////////////////////
// ethereumjs-tx
global.privateKey = Buffer.from(
  '{your-private-key-here}',
  'hex'
)

global.publicKey = web3.eth.accounts.privateKeyToAccount(
  `0x${privateKey.toString('hex')}`
).address

global.ethTx = {
  //nonce is the 'transaction sequence'
  nonce: '0x0e',
  gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  gasLimit: web3.utils.toHex('2000000'), //0x1e8480

  // give this contract some ether to power it
  // value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),

  data: `0x${bytecode}`,

  // EIP 155 chainId - mainnet: 1, ropsten: 3
  chainId: 3
}

////////////////////////////
//deploy the contract to ropsten
////////////////////////////

//create transaction
global.tx = new EthereumTx(ethTx)

//sign transaction
tx.sign(privateKey)
//
// //send tx to chain
web3.eth
.sendSignedTransaction(`0x${tx.serialize().toString('hex')}`)
//   // could take some time to be mined
.on('receipt', console.log)

////////////////////
//after we deploy, lets interact with it

// global.deployedContract = new web3.eth.Contract(
//   abi,
//   '0xf6dB51548698877421671b7bb15Aa8F58f0cFEeb'
// )

// deployedContract.methods
//   .DieselPriceUSD()
//   .call()
//   .then(console.log)

// Start repl
require('repl').start({})
