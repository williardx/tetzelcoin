const TetzelCoin = artifacts.require("./TetzelCoin.sol");
const TetzelCrowdsale = artifacts.require("./TetzelCrowdsale.sol");
const Tetzel = artifacts.require("./Tetzel.sol");

// Data for TetzelCrowdsale
const teamWallet = '0x244b236b19ea4cA308A994edd51A786C726B7864';
const charityWallet = '0x8b2448602f53608F86cf2c31D60eb3142a1596d4';
const teamPortion = 15;
const charityPortion = 85;
const totalTeamMemberAllocation = 15;
const rate = 500;

module.exports = function(deployer) {
  deployer.deploy(TetzelCoin).then(() => {
    return deployer.deploy(
      TetzelCrowdsale, 
      TetzelCoin.address,
      teamWallet,
      charityWallet,
      teamPortion,
      charityPortion,
      0, // TODO: figure out better way to test contracts and pass in startTime / endTime
      0,
      rate,
      totalTeamMemberAllocation
    ).then(() => {
      return deployer.deploy(Tetzel, TetzelCrowdsale.address);
    });
  });
};
