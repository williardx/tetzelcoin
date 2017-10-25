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
    address indexed recipient,
    uint256 payment,
    string sin
  );

  modifier onlyOwner() {
    if (msg.sender != owner) {
      throw;
    }
    _;
  }

  function Tetzel(IFtetzelCrowdsale _crowdsale) {
    owner = msg.sender;
    setCrowdsale(_crowdsale);
  }

  /*
    Set crowdsale address in case of bugs or updates.
  */
  function setCrowdsale(IFtetzelCrowdsale _crowdsale) public onlyOwner {
    crowdsale = _crowdsale;
  }

  function confess(address recipient, string sin) public payable returns (bool success) {
    require(recipient != 0x0);
    require(msg.value > 0);
    require(bytes(sin).length > 0);

    // Issue SIN tokens for the sinner
    crowdsale.buyTokens.value(msg.value)(recipient);

    // Make the confession known!
    LogConfess(msg.sender, recipient, msg.value, sin);

    return true;
  }

  function destroy() public onlyOwner {
    selfdestruct(owner);
  }

  // No sin, no SIN tokens!
  function() payable {
    throw;
  }

}
