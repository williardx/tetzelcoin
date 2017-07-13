var Tetzel = artifacts.require("./Tetzel.sol");

module.exports = function(deployer) {
  deployer.deploy(Tetzel);
};
