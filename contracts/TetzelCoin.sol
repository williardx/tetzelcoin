pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract TetzelCoin is MintableToken {
  string public constant name = "TetzelCoin";
  string public constant symbol = "SIN";
  uint public constant decimals = 18;
  bool private paused = false;
  mapping(address => bool) public minters;

  /**
   * @dev Modifier that restricts actions to being done by minters
   */
  modifier onlyMinters() {
    require(minters[msg.sender]);
    _;
  }

  /*
    @dev Pauses minting of tokens
  */
  function pause() onlyOwner {
    paused = !paused;
  }

  /**
   * @dev Function to add a new minter
   * @param minter - Address to be added to `minters` mapping
   * @return - Bool indicating if operation was successful
   */
  function addMinter(address minter) onlyOwner public returns(bool) {
    minters[minter] = true;
    return true;
  }

  /**
   * @dev Function to remove a minter
   * @param minter - Address to be removed from `minters` mapping
   * @return - Bool indicating if operation was successful
   */
  function removeMinter(address minter) onlyOwner public returns(bool) {
    minters[minter] = false;
    return true;
  }

  /**
   * @dev Function to mint tokens. Slightly modified from original so that
   * minting can be done by more than just the owner.
   * @param _to The address that will receive the minted tokens.
   * @param _amount The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(address _to, uint256 _amount) onlyMinters canMint public returns (bool) {
    require(!paused);
    totalSupply = totalSupply.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Mint(_to, _amount);
    Transfer(0x0, _to, _amount);
    return true;
  }


}
