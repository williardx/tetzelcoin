pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import './TetzelCoin.sol';

contract TetzelCrowdsale {
  using SafeMath for uint256;

  TetzelCoin public token;
  uint256 public weiRaised;
  address public teamWallet;
  address public charityWallet;
  uint256 public teamPortion; // percent
  uint256 public charityPortion; // percent
  uint256 public rate;
  uint256 public startTime;
  uint256 public endTime;
  uint256 public totalTeamMemberAllocation; // percent
  mapping(address => bool) public reigsteredTeamMembers; // address -> whether or not a team member has been registered
  mapping(address => uint256) public teamMemberTokenAllocation; // address -> number of tokens can buy after the sale is over
  address public owner;

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

  function TetzelCrowdsale(
    address _token,
    address _teamWallet,
    address _charityWallet,
    uint256 _teamPortion,
    uint256 _charityPortion,
    uint256 _startTime,
    uint256 _endTime,
    uint256 _rate,
    uint256 _totalTeamMemberAllocation
  ) {

    _startTime = now; // xcxc
    _endTime = now + 60*60; // xcxc

    require(_startTime >= now);
    require(_endTime >= _startTime);
    require(_rate > 0);
    require(_teamPortion.add(_charityPortion) == 100);
    require(_totalTeamMemberAllocation <= 100);
    require(_teamWallet != 0x0);
    require(_charityWallet != 0x0);

    owner = msg.sender;
    token = TetzelCoin(_token);
    teamWallet = _teamWallet;
    charityWallet = _charityWallet;
    teamPortion = _teamPortion;
    charityPortion = _charityPortion;
    startTime = _startTime;
    endTime = _endTime;
    rate = _rate;
    totalTeamMemberAllocation = _totalTeamMemberAllocation;
  }

  /*
    Register each team member and how many tokens they're allowed to buy
    at the conclusion of the sale. We can add team members until there's
    no more team member allocation left.

    Unfortunately Solidity can't handle decimal points so we'll just use
    whole number percentages
  */
  function registerTeamMember(address teamMember, uint256 percent) public onlyOwner {
    require(teamMemberTokenAllocation[teamMember] == 0);
    require(percent <= totalTeamMemberAllocation);
    teamMemberTokenAllocation[teamMember] = percent;
    totalTeamMemberAllocation -= percent;
  }

  /*
    Function to remove team members. Sets the token allocation back to 0
    and adds their percentage back to the total.
  */
  function removeTeamMember(address teamMember) public onlyOwner {
    totalTeamMemberAllocation = totalTeamMemberAllocation.add(teamMemberTokenAllocation[teamMember]);
    teamMemberTokenAllocation[teamMember] = 0;
  }

  // fallback function throws since token buyers must confess first
  function () payable {
    throw;
  }

  function forwardFunds() internal {
    uint256 teamValue = msg.value.mul(15).div(100); // Team keeps 15%
    uint256 charityValue = msg.value.sub(teamValue); // Charity keeps 85%    
    teamWallet.transfer(teamValue);
    charityWallet.transfer(charityValue);
  }

  function buyTokens(address beneficiary) public payable returns (bool success) {
    require(beneficiary != 0x0);
    require(validPurchase());

    uint256 weiAmount = msg.value;

    // calculate token amount to be created
    uint256 tokens = weiAmount.mul(rate);

    token.mint(beneficiary, tokens);
    TokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

    weiRaised = weiRaised.add(weiAmount);

    forwardFunds();
    return true;
  }

  /*
    Team members have the option to buy some number of tokens at the conclusion
    of the sale for at least 1 wei. All of this money goes to charity.
  */
  function buyTeamTokens() public payable returns (bool success) {
    require(hasEnded());
    require(teamMemberTokenAllocation[msg.sender] > 0);
    require(msg.value > 0);

    uint256 tokenAmount = weiRaised.mul(rate).mul(teamMemberTokenAllocation[msg.sender]).div(100);
    token.mint(msg.sender, tokenAmount);
    TokenPurchase(msg.sender, msg.sender, msg.value, teamMemberTokenAllocation[msg.sender]);

    charityWallet.transfer(msg.value);
    teamMemberTokenAllocation[msg.sender] = 0;
    return true;
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
