// const rpc = 'http://localhost:8545'

//ropsten network
const rpc = 'https://ropsten.infura.io/{use-your-ropsten-api-key-here}'

const fs = require('fs')

const Web3 = require('web3') //Ethereum JS API
const EthereumTx = require('ethereumjs-tx')
const solc = require('solc') //JS Solidity Compiler

const provider = new Web3.providers.HttpProvider(rpc)

const web3 = new Web3(provider)

const toHex = web3.utils.toHex
const toWei = web3.utils.toWei

const loadContract = path => fs.readFileSync(path, 'utf8')

module.exports = {
  web3,
  provider,

  toHex,
  toWei,

  loadContract,
  solc,

  EthereumTx
}
