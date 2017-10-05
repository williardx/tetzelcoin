pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import './TetzelCoin.sol';

contract TetzelCrowdsale is Crowdsale {
  address public teamWallet = 0x244b236b19ea4cA308A994edd51A786C726B7864; // xcxc - Change this to real wallet
  address public charityWallet = 0x8b2448602f53608F86cf2c31D60eb3142a1596d4; // xcxc - Change this to real wallet
  uint256 public rate = 500; // 1 eth = 500 SIN
  uint256 public startTime = block.timestamp;
  uint256 public endTime = block.timestamp + 60*60;

  bool teamTokensMinted = false;

  function TetzelCrowdsale() Crowdsale(startTime, endTime, rate, teamWallet) {}

  function createTokenContract() internal returns (MintableToken) {
    return new TetzelCoin();
  }

  function forwardFunds() internal {
    uint256 teamValue = msg.value * 15 / 100; // Team keeps 15%
    uint256 charityValue = msg.value - teamValue; // Charity keeps 85%
    wallet.transfer(teamValue);
    charityWallet.transfer(charityValue);
  }

  function mintTeamTokens() public {
    require(hasEnded() && !teamTokensMinted);
    token.mint(teamWallet, token.totalSupply() * 15 / 85);
    teamTokensMinted = true;
  }

}
