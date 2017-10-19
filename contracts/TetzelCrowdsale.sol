pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './TetzelCoin.sol';

contract TetzelCrowdsale {
  using SafeMath for uint256;

  TetzelCoin public token;
  uint256 public weiRaised;
  address public teamWallet = 0x244b236b19ea4cA308A994edd51A786C726B7864; // xcxc - Change this to real address
  address public charityWallet = 0x8b2448602f53608F86cf2c31D60eb3142a1596d4; // xcxc - Change this to real address
  address public costRefundWallet = 0xeFDA35E0CdF4E70CB616ef3265204AD1B037CFb9; // xcxc - Change this to real address
  uint256 public totalCost = 1 ether; // xcxc - change this to real value once final costs are known
  uint256 public rate = 500; // 1 eth = 500 SIN
  uint256 public startTime = block.timestamp;
  uint256 public endTime = block.timestamp + 60*60;
  bool public teamMembersRegistered = false;
  mapping(address => uint256) public teamMemberTokenAllocation; // address -> number of tokens can buy after the sale is over
  address owner;

  modifier onlyOwner() {
    if (msg.sender != owner) {
      throw;
    }
    _;
  }

  /**
   * event for token purchase logging
   * @param purchaser who paid for the tokens
   * @param beneficiary who got the tokens
   * @param value weis paid for purchase
   * @param amount amount of tokens purchased
   */
  event TokenPurchase(
    address indexed purchaser, 
    address indexed beneficiary, 
    uint256 value, 
    uint256 amount
  );

  function TetzelCrowdsale(address _token) {
    owner = msg.sender;
    token = TetzelCoin(_token);
  }

  /*
    Register each team member and how many tokens they're allowed to buy
    at the conclusion of the sale. We only want to run this function once
    to prevent being able to repeatedly buy tokens after the sale has ended.
  */
  function registerTeamMembers() onlyOwner {
    require(!teamMembersRegistered);
    teamMemberTokenAllocation[0x6FD4d4c1ab6590FCF51A1f03416043d1da483386] = token.totalSupply() * 2 / 100; // xcxc - change this to real address
    teamMembersRegistered = true;
  }


  // fallback function throws since token buyers must confess first
  function () payable {
    throw;
  }

  function forwardFunds() internal {
    uint256 teamValue = msg.value * 15 / 100; // Team keeps 15%
    uint256 charityValue = msg.value - teamValue; // Charity keeps 85%    
    teamWallet.transfer(teamValue);
    charityWallet.transfer(charityValue);
  }

  function buyTokens(address beneficiary) public payable {
    require(beneficiary != 0x0);
    require(validPurchase());

    uint256 weiAmount = msg.value;

    // calculate token amount to be created
    uint256 tokens = weiAmount.mul(rate);

    token.mint(beneficiary, tokens);
    TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

    weiRaised = weiRaised.add(weiAmount);

    forwardFunds();
  }

  /*
    Team members have the option to buy some number of tokens at the conclusion
    of the sale for whatever price they want. All of this money goes to charity.
  */
  function buyTeamTokens() public payable {
    require(hasEnded());
    require(teamMemberTokenAllocation[msg.sender] > 0);
    require(msg.value > 0);

    token.mint(msg.sender, teamMemberTokenAllocation[msg.sender]);
    charityWallet.transfer(msg.value);
    weiRaised = weiRaised.add(msg.value);
    teamMemberTokenAllocation[msg.sender] = 0;
  }

  // @return true if the transaction can buy tokens
  function validPurchase() internal constant returns (bool) {
    bool withinPeriod = now >= startTime && now <= endTime;
    bool nonZeroPurchase = msg.value != 0;
    return withinPeriod && nonZeroPurchase;
  }

  // @return true if crowdsale event has ended
  function hasEnded() public constant returns (bool) {
    return now > endTime;
  }

}
