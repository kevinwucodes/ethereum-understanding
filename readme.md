# packages

* web3 - Ethereum JS API
* solc - JS Solidity Compiler



# internals notes
* gas is the EVM cost of running the contract (the gas limit)
  * if you input a higher number, this is ok, because whatever doesn't get used gest refunded (test this)
* gasPrice is how much I'm willing to pay per gas based on market forces.  Mainnet is typically 20 gwei (20000000000 wei)
