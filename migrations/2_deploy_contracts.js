const TetzelCoin = artifacts.require("./TetzelCoin.sol");
const TetzelCrowdsale = artifacts.require("./TetzelCrowdsale.sol");
const Tetzel = artifacts.require("./Tetzel.sol");
const TetzelTeamWallet = artifacts.require("./TetzelTeamWallet.sol");

// Data for TetzelCrowdsale
const charityWallet = '0x8b2448602f53608F86cf2c31D60eb3142a1596d4';
const teamPortion = 15;
const totalTeamMemberAllocation = 15;
const rate = 500;

let tetzelCoinInstance, tetzelTeamWalletInstance, tetzelCrowdsaleInstance;

module.exports = function(deployer) {
  deployer.deploy(TetzelCoin).then((instance) => {
    return deployer.deploy(TetzelTeamWallet).then(() => {
      return deployer.deploy(
        TetzelCrowdsale, 
        TetzelCoin.address,
        TetzelTeamWallet.address,
        charityWallet,
        teamPortion,
        0, // TODO: figure out better way to test contracts and pass in startTime / endTime
        0,
        rate,
        totalTeamMemberAllocation
      ).then(() => {

        TetzelCoin.deployed().then((tetzelCoinInstance) => {
          tetzelCoinInstance.addMinter(TetzelCrowdsale.address);
        });

        return deployer.deploy(Tetzel, TetzelCrowdsale.address).then(() => {

          TetzelCrowdsale.deployed().then((tetzelCrowdsaleInstance) => {
            tetzelCrowdsaleInstance.setTokenBuyer(Tetzel.address);
          });

        });

      });
    });
  });
};
