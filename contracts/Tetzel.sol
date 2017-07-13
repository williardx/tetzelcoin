pragma solidity ^0.4.11;

import './TetzelCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';

contract Tetzel {

  address owner; 
  TetzelCrowdsale public crowdsale;

  // Registry of all sins allowing anyone to look up the SHA256 hashes of
  // a user's confessions
  mapping (address => bytes32[]) public sins;

  event Confess(
    address indexed sinner,
    bytes32 indexed sinHash,
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

    // Register the sin and store the hash of the sin in the sins mapping
    address sinner = msg.sender;
    bytes32 sinHash = getSinHash(sin);
    sins[sinner].push(sinHash);

    // Issue TetzelCoin for the sinner
    crowdsale.buyTokens.value(msg.value)(msg.sender); 

    // Make the confession known!
    Confess(sinner, sinHash, msg.value, sin);

    return true;
  }

  function getSins() constant returns (bytes32[]) {
    return sins[msg.sender];
  }

  function getSinsByAddress(address addr) constant returns (bytes32[]) {
    return sins[addr];
  }

  function getSinHash(string sin) constant returns (bytes32) {
    return sha256(sin);
  }

  function destroy() onlyOwner {
    selfdestruct(owner);
  }

  // No sin, no TetzelCoin!
  function() payable {
    throw;
  }

}
