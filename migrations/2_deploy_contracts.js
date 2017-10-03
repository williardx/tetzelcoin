var TetzelCrowdsale = artifacts.require("./TetzelCrowdsale.sol");
var Tetzel = artifacts.require("./Tetzel.sol");

module.exports = function(deployer) {
  deployer.deploy(TetzelCrowdsale).then(() => {
    return deployer.deploy(Tetzel, TetzelCrowdsale.address);
  });
};
