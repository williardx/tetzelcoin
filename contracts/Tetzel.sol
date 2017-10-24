pragma solidity ^0.4.11;

// Interface for TetzelCrowdsale contract
contract IFtetzelCrowdsale {
  function buyTokens(address beneficiary) public payable;
}

contract Tetzel {

  address owner; 
  IFtetzelCrowdsale public crowdsale;

  event LogConfess(
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

  function Tetzel(address _crowdsale) {
    owner = msg.sender;
    crowdsale = IFtetzelCrowdsale(_crowdsale);
  }

  function confess(string sin) payable returns (bool success) {
    
    require(msg.value > 0);
    require(bytes(sin).length > 0);

    // Issue TetzelCoin for the sinner
    crowdsale.buyTokens.value(msg.value)(msg.sender);

    // Make the confession known!
    LogConfess(msg.sender, msg.value, sin);

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
