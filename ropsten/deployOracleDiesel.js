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

////////////////////////////
//deploy the contract to ropsten
////////////////////////////

// global.ethTx = {
//   //nonce is the 'transaction sequence'
//   nonce: '0x14',
//   gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//   gasLimit: web3.utils.toHex('2000000'), //0x1e8480
//
//   // give this contract some ether to power it
//   // value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
//
//   data: `0x${bytecode}`,
//
//   // EIP 155 chainId - mainnet: 1, ropsten: 3
//   chainId: 3
// }

// create transaction
// global.tx = new EthereumTx(ethTx)
//
// //sign transaction
// tx.sign(privateKey)
// //
// // //send tx to chain
// web3.eth
//   .sendSignedTransaction(`0x${tx.serialize().toString('hex')}`)
//   //   // could take some time to be mined
//   .on('receipt', console.log)

////////////////////
//after we deploy, lets interact with it

global.deployedContract = new web3.eth.Contract(
  abi,
  '0x52AEd052c4004eF9bAa02236C7624B111B5Fcd5f'
)

//simple calls without ether costs
deployedContract.methods
  .DieselPriceUSD()
  .call()
  .then(value => console.log('diesel price is: ', value))

deployedContract.methods
  .currentTimeUTC()
  .call()
  .then(value => console.log('current time is: ', value))

///////////////////
//trying to execute method directly using a manually create eth transaction
///////////////////
// global.commandToCall = 'updateTime()'
// global.commandToCallSha = web3.utils.sha3(commandToCall).slice(2, 10)
//
// global.ethTx = {
//   //nonce is the 'transaction sequence'
//   nonce: '0x19',
//   gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//   gasLimit: web3.utils.toHex('2000000'), //0x1e8480
//
//   // give this contract some ether to power it
//   // value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
//
//   //contract address where fuelprice is deployed
//   to: '0x52AEd052c4004eF9bAa02236C7624B111B5Fcd5f',
//
//   data: `0x${commandToCallSha}`,
//
//   // EIP 155 chainId - mainnet: 1, ropsten: 3
//   chainId: 3
// }
//
// // create transaction
// global.tx = new EthereumTx(ethTx)
//
// //sign transaction
// tx.sign(privateKey)
// //
// // //send tx to chain
// web3.eth
//   .sendSignedTransaction(`0x${tx.serialize().toString('hex')}`)
//   //   // could take some time to be mined
//   .on('receipt', console.log)

// Start repl
require('repl').start({})
