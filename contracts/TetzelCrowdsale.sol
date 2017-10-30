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
  uint256 public rate;
  uint256 public startTime;
  uint256 public endTime;
  uint256 public totalTeamMemberAllocation; // percent
  mapping(address => uint256) public teamMemberTokenAllocation; // address -> number of tokens can buy after the sale is over
  mapping(address => bool) public approvedTokenBuyers;
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
  event LogTokenPurchase(
    address indexed purchaser, 
    address indexed beneficiary, 
    uint256 value, 
    uint256 amount
  );

  function TetzelCrowdsale(
    TetzelCoin _token,
    address _teamWallet,
    address _charityWallet,
    uint256 _teamPortion,
    uint256 _startTime,
    uint256 _endTime,
    uint256 _rate,
    uint256 _totalTeamMemberAllocation
  ) {

    require(_startTime >= now);
    require(_endTime >= _startTime);
    require(_rate > 0);
    require(_teamPortion <= 100);
    require(_totalTeamMemberAllocation <= 100);
    require(_teamWallet != 0x0);
    require(_charityWallet != 0x0);

    owner = msg.sender;
    teamWallet = _teamWallet;
    charityWallet = _charityWallet;
    teamPortion = _teamPortion;
    startTime = _startTime;
    endTime = _endTime;
    rate = _rate;
    totalTeamMemberAllocation = _totalTeamMemberAllocation;
    setToken(_token);
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

  /*
    Switch out the token that we're buying in case of bugs or updates.
  */
  function setToken(TetzelCoin _token) public onlyOwner {
    token = _token;
  }

  /*
    Add/remove approved token buyers. We only want people buying
    SIN tokens from the main Tetzel contract so that they have to confess
    in order to get SIN tokens.
  */
  function setTokenBuyer(address tokenBuyer) public onlyOwner {
    bool canBuyTokens = approvedTokenBuyers[tokenBuyer];
    approvedTokenBuyers[tokenBuyer] = !canBuyTokens;
  }

  // fallback function throws since token buyers must confess first
  function () payable {
    throw;
  }

  function forwardFunds() internal {
    uint256 teamValue = msg.value.mul(teamPortion).div(100);
    uint256 charityValue = msg.value.sub(teamValue);
    teamWallet.transfer(teamValue);
    charityWallet.transfer(charityValue);
  }

  function buyTokens(address beneficiary) public payable returns (bool success) {
    require(beneficiary != 0x0);
    require(validPurchase());

    uint256 weiAmount = msg.value;

    // calculate token amount to be created
    uint256 tokens = weiAmount.mul(rate);

    weiRaised = weiRaised.add(weiAmount);

    token.mint(beneficiary, tokens);
    LogTokenPurchase(msg.sender, beneficiary, weiAmount, tokens);

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
    teamMemberTokenAllocation[msg.sender] = 0;
    token.mint(msg.sender, tokenAmount);
    LogTokenPurchase(msg.sender, msg.sender, msg.value, tokenAmount);

    charityWallet.transfer(msg.value);
    return true;
  }

  // @return true if the transaction can buy tokens
  function validPurchase() internal constant returns (bool) {
    bool withinPeriod = now >= startTime && now <= endTime;
    bool nonZeroPurchase = msg.value != 0;
    return withinPeriod && nonZeroPurchase && approvedTokenBuyers[msg.sender];
  }

  // @return true if crowdsale event has ended
  function hasEnded() public constant returns (bool) {
    return now > endTime;
  }

}
