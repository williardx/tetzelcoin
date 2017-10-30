require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = '';

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
      network_id: 3,
      gas: 4612388,
    },
    live: {
      provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/"),
      network_id: 1,
      gas: 4612388,
      gasPrice: 4000000000, // 4 gwei
    }
  }
};
