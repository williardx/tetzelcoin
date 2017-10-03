pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import './TetzelCoin.sol';

contract TetzelCrowdsale is Crowdsale {
  address public wallet = 0x244b236b19ea4cA308A994edd51A786C726B7864; // xcxc - Change this to real wallet
  uint256 public rate = 500; // 1 eth = 500 TZL
  uint256 public startTime = block.timestamp;
  uint256 public endTime = block.timestamp + 1;

  function TetzelCrowdsale() Crowdsale(startTime, endTime, rate, wallet) {}

  function createTokenContract() internal returns (MintableToken) {
    return new TetzelCoin();
  }

}
