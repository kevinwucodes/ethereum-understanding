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

global.loadContract = loadContract

//////////////////////////////////////

global.acct1 = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'
global.acct2 = '0xf17f52151ebef6c7334fad080c5704d77216b732'
global.acct3 = '0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef'
global.acct4 = '0x821aea9a577a9b44299b9c15c88cf3087f3b5544'

global.getBalance = async acct =>
  web3.utils.fromWei(await web3.eth.getBalance(acct), 'ether')

global.getMultipleBalances = async () => {
  //get balances
  console.log('acct1 balance:', await getBalance(acct1))
  console.log('acct2 balance:', await getBalance(acct2))
}

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

// // the transaction object
global.transactionObject = contract.deploy()

///////////////////////

const doit = async () => {
  await getMultipleBalances()

  // the deployed instance of the contract
  const instance = await transactionObject.send({
    from: acct1,

    //assign gas.  Just how accurate is this anyways?
    gas: await transactionObject.estimateGas(),

    //typical gasPrice is 20 gwei = 20 billion wei
    gasPrice: toWei('20', 'gwei')
  })

  console.log('deployed instance')

  await getMultipleBalances()

  // this is a bug: contract instances loses provider
  // https://github.com/ethereum/web3.js/issues/1253
  instance.setProvider(provider)

  // calling getResult on the instance's contract
  let result = await instance.methods.getResult().call()
  console.log('result: ', result)

  await getMultipleBalances()

  let addingOperation

  // acct1: send tx to add two numbers
  addingOperation = await instance.methods.addNumbers(4, 5)
  addingOperation = await addingOperation.send({
    from: acct1,
    gas: await addingOperation.estimateGas(),
    //typical gasPrice is 20 gwei = 20 billion wei
    gasPrice: toWei('20', 'gwei')
  })
  console.log('completed addingOperation: ', addingOperation)

  await getMultipleBalances()

  // see the result after adding
  result = await instance.methods.getResult().call()
  console.log('result: ', result)

  // acct2: send tx to add two numbers
  addingOperation = await instance.methods.addNumbers(10, 13)
  addingOperation = await addingOperation.send({
    from: acct2,
    gas: await addingOperation.estimateGas(),
    //typical gasPrice is 20 gwei = 20 billion wei
    gasPrice: toWei('20', 'gwei')
  })
  console.log('completed addingOperation: ', addingOperation)

  await getMultipleBalances()

  // see the result after adding
  result = await instance.methods.getResult().call()
  console.log('result: ', result)
}

doit()
  .then('*** all done')
  .catch(err => console.log('*** error', err))

// Start repl
require('repl').start({})
