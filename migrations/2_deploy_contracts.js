var TetzelCoin = artifacts.require("./TetzelCoin.sol");
var TetzelCrowdsale = artifacts.require("./TetzelCrowdsale.sol");
var Tetzel = artifacts.require("./Tetzel.sol");

module.exports = function(deployer) {
  deployer.deploy(TetzelCoin).then(() => {
    return deployer.deploy(TetzelCrowdsale, TetzelCoin.address).then(() => {
      return deployer.deploy(Tetzel, TetzelCrowdsale.address);
    });
  });
};
