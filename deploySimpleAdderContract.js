const {
  web3,
  provider,

  toHex,
  toWei,

  loadContract,
  solc,

  EthereumTx
} = require('./helpers')

global.web3 = web3
global.provider = provider
global.toHex = toHex
global.toWei = toWei
global.loadContract = loadContract
global.solc = solc
global.EthereumTx = EthereumTx

//////////////////////////////////////

global.rawSources = {
  // 'oraclizeAPI_0.5.sol': loadContract('./contracts/oraclizeAPI_0.5.sol'),
  // 'WolframAlpha.sol': loadContract('./contracts/WolframAlpha.sol')
  'Adder.sol': loadContract('./contracts/Adder.sol')
}

global.compiled = solc.compile({ sources: rawSources })

global.abi = JSON.parse(compiled.contracts['Adder.sol:Adder'].interface)
global.bytecode = compiled.contracts['Adder.sol:Adder'].bytecode

//the contract instance
global.contract = new web3.eth.Contract(abi, { data: bytecode })

// the transaction object for web3
global.transactionObject = contract.deploy()

///////////////////////
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
  nonce: '0x08',
  gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
  gasLimit: web3.utils.toHex('200000'),

  data: `0x${bytecode}`,

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
