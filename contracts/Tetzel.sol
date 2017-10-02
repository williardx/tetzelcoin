pragma solidity ^0.4.11;

import './TetzelCrowdsale.sol';

contract Tetzel {

  address owner; 
  TetzelCrowdsale public crowdsale;

  event Confess(
    address indexed sinner,
    uint256 indexed payment,
    string sin
  );

  modifier onlyOwner() {
    if (msg.sender != owner) {
      throw;
    }
    _;
  }

  function Tetzel() {
    owner = msg.sender;
    crowdsale = createCrowdsale();
  }

  function createCrowdsale() internal returns (TetzelCrowdsale) {
      return new TetzelCrowdsale();
  }

  function confess(string sin) payable returns (bool success) {

    // No forgiveness for those who don't pay
    if (msg.value == 0) {
      throw;
    }

    // Issue TetzelCoin for the sinner
    crowdsale.buyTokens.value(msg.value)(msg.sender); 

    // Make the confession known!
    Confess(msg.sender, msg.value, sin);

    return true;
  }

  function destroy() onlyOwner {
    selfdestruct(owner);
  }

  // No sin, no TetzelCoin!
  function() payable {
    throw;
  }

}
