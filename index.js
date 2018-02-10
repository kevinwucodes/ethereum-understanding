const rpc = 'http://localhost:8545'

const fs = require('fs')

global.Web3 = require('web3') //Ethereum JS API
global.solc = require('solc') //JS Solidity Compiler

global.provider = new Web3.providers.HttpProvider(rpc)

global.web3 = new Web3(provider)

global.loadContract = path => fs.readFileSync(path, 'utf8')

global.acct1 = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'

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
  // the deployed instance of the contract
  const instance = await transactionObject.send({
    from: acct1,

    //assign gas.  Just how accurate is this anyways?
    gas: await transactionObject.estimateGas(),

    //typical gasPrice is 20 gwei = 20 billion wei
    gasPrice: web3.utils.toWei('20', 'gwei')
  })

  // this is a bug: contract instances loses provider
  // https://github.com/ethereum/web3.js/issues/1253
  instance.setProvider(provider)

  // calling getResult on the instance's contract
  let result = await instance.methods.getResult().call()
  console.log('result: ', result)

  // send tx to add two numbers
  let addingOperation = await instance.methods.addNumbers(4, 5)
  addingOperation = await addingOperation.send({
    from: acct1,
    gas: await addingOperation.estimateGas(),
    //typical gasPrice is 20 gwei = 20 billion wei
    gasPrice: web3.utils.toWei('20', 'gwei')
  })
  console.log('addingOperation: ', addingOperation)

  // see the result after adding
  result = await instance.methods.getResult().call()
  console.log('result: ', result)
}

doit()
  .then('*** all done')
  .catch(err => console.log('*** error', err))

// transactionObject
//   .send(
//     {
//       from: acct1,
//       gas: 500000,
//       gasPrice: '20000000000'
//     }
//     // ,function(error, transactionHash) {
//     //   // console.log('inside send: error', error);
//     //   // console.log('');
//     // }
//   )
// .on('error', function(error) {
//   console.log('on-error', error)
// })
// .on('transactionHash', function(transactionHash) {
//   console.log('on-transactionHash', transactionHash)
// })
// .on('receipt', function(receipt) {
//   console.log('on-receipt', receipt)
//   console.log(receipt.contractAddress) // contains the new contract address
// })
// .on('confirmation', function(confirmationNumber, receipt) {
//   console.log('on-confirmation', confirmationNumber)
// })
// .then(function(newContractInstance) {
//   console.log('after then', newContractInstance)
//   // console.log(newContractInstance.options.address) // instance with the new contract address
//
//   return newContractInstance.methods.getResult().call()
// })
// // .then(stuff => console.log('stuff', stuff))
// .catch(err => console.log('fallout error', err))
//

// .then(deployed =>
//   console.log('deployed at:', deployed) //this is object type "Contract"
//   // newContractInstance.methods.getResult.call({gas: 500000, gasPrice: 20000000000})
// )
// .then(value => console.log('valueeeee', value))

// Start repl
require('repl').start({})
