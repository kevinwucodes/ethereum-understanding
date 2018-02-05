global.rpc = 'http://localhost:8545'

global.fs = require('fs')

global.Web3 = require('web3') //Ethereum JS API
global.solc = require('solc') //JS Solidity Compiler

global.web3 = new Web3(new Web3.providers.HttpProvider(rpc))

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

global.contract = new web3.eth.Contract(abi, { data: bytecode })

global.contractAddress = contract
  .deploy()
  .send({ from: acct1, gas: 143144, gasPrice: 20000000000 })
  

// Start repl
require('repl').start({})
