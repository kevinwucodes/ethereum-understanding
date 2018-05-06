const {
  web3,
  provider,

  toHex,
  toWei,

  loadContract,
  solc
} = require('../helpers')

global.web3 = web3
global.provider = provider
global.toHex = toHex
global.toWei = toWei
global.loadContract = loadContract
global.solc = solc

//////////////////////////////////////

global.rawSources = {
  'oraclize0.4.sol': loadContract('./contracts/oraclize0.4.sol'),
  'FuelPrice.sol': loadContract('./contracts/FuelPrice.sol')
}

global.compiled = solc.compile({ sources: rawSources })

global.abi = JSON.parse(compiled.contracts['FuelPrice.sol:FuelPrice'].interface)
global.bytecode = compiled.contracts['FuelPrice.sol:FuelPrice'].bytecode

///////////////////////

global.privateKey = 'your-private-key-here'

global.publicKey = web3.eth.accounts.privateKeyToAccount(privateKey).address

////////////////////////////
//deploy the contract to ropsten
////////////////////////////

web3.eth.accounts
  .signTransaction(
    {
      // nonce: '0x1B', //auto-determined by web3

      chainId: 3, // EIP 155 chainId - mainnet: 1, ropsten: 3

      data: `0x${bytecode}`,

      gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
      gas: web3.utils.toHex('3000000')
    },
    privateKey
  )
  .then(rlpTransaction => rlpTransaction.rawTransaction)
  .then(rawTx => web3.eth.sendSignedTransaction(rawTx))
  .catch(console.error)

////////////////////
//after we deploy, lets interact with it

global.deployedContract = new web3.eth.Contract(
  abi,
  '0x52AEd052c4004eF9bAa02236C7624B111B5Fcd5f'
)

//simple calls without ether costs
// deployedContract.methods
//   .DieselPriceUSD()
//   .call()
//   .then(value => console.log('diesel price is: ', value))
//
// deployedContract.methods
//   .currentTimeUTC()
//   .call()
//   .then(value => console.log('current time is: ', value))

///////////////////
//trying to execute method directly using a manually create eth transaction
///////////////////
// global.commandToCall = 'updateTime()'
// global.commandToCallSha = web3.utils.sha3(commandToCall).slice(2, 10)

// Start repl
require('repl').start({})
