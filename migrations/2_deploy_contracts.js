const TetzelCoin = artifacts.require("./TetzelCoin.sol");
const TetzelCrowdsale = artifacts.require("./TetzelCrowdsale.sol");
const Tetzel = artifacts.require("./Tetzel.sol");
const TetzelTeamWallet = artifacts.require("./TetzelTeamWallet.sol");

// Data for TetzelCrowdsale
const charityWallet = '0xB21A66754BBca5fb116e1809e6bd8588b7f05c10';
const teamPortion = 15;
const totalTeamMemberAllocation = 15;
const rate = 500;

let tetzelCoinInstance, tetzelTeamWalletInstance, tetzelCrowdsaleInstance;

module.exports = function(deployer) {
  deployer.deploy(TetzelCoin).then(() => {
    return deployer.deploy(TetzelTeamWallet).then(() => {
      return deployer.deploy(
        TetzelCrowdsale, 
        TetzelCoin.address,
        TetzelTeamWallet.address,
        charityWallet,
        teamPortion,
        0,
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
