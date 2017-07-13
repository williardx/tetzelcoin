pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract TetzelCoin is MintableToken {
  string public constant name = "TetzelCoin";
  string public constant symbol = "SIN";
  uint public constant decimals = 18;
}
