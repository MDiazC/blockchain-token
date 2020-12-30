const path = require("path");
require("dotenv").config({path: ".env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const accountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
  	ganache: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*"
    },
    ganache_hdwallet: {
      provider: () =>
       new HDWalletProvider({
         mnemonic: {
           phrase: process.env.MNEMONIC
         },
         providerOrUrl: "http://127.0.0.1:8545",
         addressIndex: accountIndex
       }),
      network_id: 5777,
    },
    görli_hdwallet_infura: {
      provider: () =>
       new HDWalletProvider({
         mnemonic: {
           phrase: process.env.MNEMONIC
         },
         providerOrUrl: process.env.GOERLI_INFURA,
         addressIndex: accountIndex
       }),
      network_id: 5,
      gas: 2500000,
      gasPrice: 0x01,
    }
  },
  compilers: {
    solc: {
      version: "0.6.2"
    }
  }
};
