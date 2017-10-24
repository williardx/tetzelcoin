pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';

contract TetzelTeamWallet {
    using SafeMath for uint256;

    address private owner;
    mapping(address => uint256) public teamMemberShares;
    uint256 public totalShares;
    uint256 public totalReleased;
    bool public paused = true;
    bool public sharesLocked = false;

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    modifier onlyTeam() {
        require(teamMemberShares[msg.sender] > 0);
        _;
    }

    function TetzelTeamWallet() {
        owner = msg.sender;
    }

    function setTeamMemberShares(address _teamMember, uint256 _shares) public onlyOwner returns (bool success) {
        require(_teamMember != address(0));
        require(!sharesLocked);

        totalShares = totalShares.add(_shares).sub(teamMemberShares[_teamMember]);
        teamMemberShares[_teamMember] = _shares;
        return true;
    }

    function claim() public onlyTeam returns (bool success) {
        require(!paused && sharesLocked);
        require(teamMemberShares[msg.sender] > 0);
        
        // Need to keep track of how much ether total we've received
        // so we know how much to give each person as the balance dwindles
        uint256 totalReceived = this.balance.add(totalReleased);
        uint256 amount = totalReceived.mul(teamMemberShares[msg.sender]).div(totalShares);
        totalReleased = totalReleased.add(amount);
        teamMemberShares[msg.sender] = 0;
        msg.sender.transfer(amount);
        return true;
    }

    function lockShares() public onlyOwner returns (bool success) {
        sharesLocked = true;
    }

    /*
        @dev This is a simple guard against bugs and hacks. If something goes
        wrong we can pause it and then selfdestruct and figure out a different
        way to distribute funds.
    */
    function pause() public onlyOwner {
        paused = !paused;
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    function() payable { }

}