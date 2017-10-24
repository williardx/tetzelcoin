'use strict';

const TetzelTeamWallet = artifacts.require('./TetzelTeamWallet.sol');

import expectThrow from './helpers/expectThrow';

contract('TetzelTeamWallet', function(accounts) {

  // Roles for testing
  const owner = accounts[0];
  const teamMemberOne = accounts[1];
  const teamMemberTwo = accounts[2];
  const teamMemberThree = accounts[3];
  const somePerson = accounts[4];

  beforeEach(async function() {
    this.contract = await TetzelTeamWallet.new();
  });
  
  describe('setting team member shares', function() {

    it('should not let non-owners set team member shares', async function() {
      await expectThrow(this.contract.setTeamMemberShares(teamMemberOne, 1, {from: teamMemberOne}));
    });

    it('should update team member shares with new share values', async function() {
      await this.contract.setTeamMemberShares(teamMemberOne, 1, {from: owner});
      const oldShares = await this.contract.teamMemberShares(teamMemberOne);
      const expectedOldShares = 1;
      assert.equal(oldShares, expectedOldShares);

      await this.contract.setTeamMemberShares(teamMemberOne, 5, {from: owner});
      const newShares = await this.contract.teamMemberShares(teamMemberOne);
      const expectedNewShares = 5;
      assert.equal(newShares, expectedNewShares);
    });

    it('should update the total shares count', async function() {
      await this.contract.setTeamMemberShares(teamMemberOne, 1, {from: owner});
      let totalShares = await this.contract.totalShares();
      let expectedTotalShares = web3.toBigNumber(1);
      assert(totalShares.equals(expectedTotalShares));

      await this.contract.setTeamMemberShares(teamMemberTwo, 5, {from: owner});
      totalShares = await this.contract.totalShares();
      expectedTotalShares = web3.toBigNumber(6);
      assert(totalShares.equals(expectedTotalShares));

      await this.contract.setTeamMemberShares(teamMemberTwo, 2, {from: owner});
      totalShares = await this.contract.totalShares();
      expectedTotalShares = web3.toBigNumber(3);
      assert(totalShares.equals(expectedTotalShares));
    });

  });

  describe('claiming funds', function() {

    const teamMemberOneShares = 3;
    const teamMemberTwoShares = 5;
    const teamMemberThreeShares = 2;

    beforeEach(async function(){
      await web3.eth.sendTransaction(
        {from: somePerson, to: this.contract.address, value: web3.toWei(1, 'ether')}
      );
      await this.contract.setTeamMemberShares(teamMemberOne, teamMemberOneShares, {from: owner});
      await this.contract.setTeamMemberShares(teamMemberTwo, teamMemberTwoShares, {from: owner});
      await this.contract.setTeamMemberShares(teamMemberThree, teamMemberThreeShares, {from: owner});

      await this.contract.lockShares({from: owner});
      await this.contract.pause({from: owner});
    });

    it('should allow team members to withdraw funds proportional to their shares', async function() {

      const totalShares = teamMemberOneShares + teamMemberTwoShares + teamMemberThreeShares;
      const teamMembers = [teamMemberOne, teamMemberTwo, teamMemberThree];
      const teamMemberShares =  [teamMemberOneShares, teamMemberTwoShares, teamMemberThreeShares];

      for (let i = 0; i < teamMembers.length; i++) {
        let member = teamMembers[i];
        let shares = teamMemberShares[i];
        let preMemberBalance = web3.eth.getBalance(member);
        let claimReceipt = await this.contract.claim({from: member});
        let postMemberBalance = web3.eth.getBalance(member);
        let tx = web3.eth.getTransaction(claimReceipt.tx);
        let gasUsed = tx.gasPrice.times(claimReceipt.receipt.cumulativeGasUsed);
        let expectedDiff = web3.toBigNumber(web3.toWei(1, 'ether') * shares / totalShares).minus(gasUsed);
        assert(postMemberBalance.minus(preMemberBalance).equals(expectedDiff));
      }

    });

    it('should set member shares to 0 after withdrawing', async function() {
      await this.contract.claim({from: teamMemberOne});
      const expectedShares = 0;
      const shares = await this.contract.teamMemberShares(teamMemberOne);
      assert.equal(shares, expectedShares);
    });

    it('should not change total shares', async function() {
      const preTotalShares = await this.contract.totalShares();
      await this.contract.claim({from: teamMemberOne});
      const postTotalShares = await this.contract.totalShares();
      assert(preTotalShares.equals(postTotalShares));
    });

    it('should update total released', async function() {
      const preTotalReleased = await this.contract.totalReleased();
      await this.contract.claim({from: teamMemberOne});
      const postTotalReleased = await this.contract.totalReleased();
      const expectedDiff = web3.toWei(0.3, 'ether');
      assert(postTotalReleased.minus(preTotalReleased).equals(expectedDiff));
    });

    it('should not allow team members to withdraw more than once', async function() {
      await this.contract.claim({from: teamMemberOne});
      await expectThrow(this.contract.claim({from: teamMemberOne}));
    });

  });

  describe('pausing', function() {

    it('should start out paused', async function() {
      const paused = await this.contract.paused();
      assert(paused === true);
    });

    it('should let the owner pause', async function() {
      await this.contract.pause({from: owner});
      const paused = await this.contract.paused();
      assert(paused === false);
    });

    it('should not let non-owner pause', async function() {
      await expectThrow(this.contract.pause({from: teamMemberOne}));
    });

    it('should prevent funds from being withdrawn when paused', async function() {
      const paused = await this.contract.paused();
      assert(paused === true);
      
      await this.contract.setTeamMemberShares(teamMemberOne, 1);
      await expectThrow(this.contract.claim({from: teamMemberOne}));
    });

  });

  describe('locking shares', function() {

    it('should start out unlocked', async function() {
      const locked = await this.contract.sharesLocked();
      assert(locked === false);
    });

    it('should let the owner lock shares', async function() {
      await this.contract.lockShares({from: owner});
      const locked = await this.contract.sharesLocked();
      assert(locked === true);
    });

    it('should not let non-owner lock shares', async function() {
      await expectThrow(this.contract.lockShares({from: teamMemberOne}));
    });

    it('should prevent shares from being set when locked', async function() {
      await this.contract.lockShares({from: owner});
      await expectThrow(this.contract.setTeamMemberShares(teamMemberOne, 1, {from: owner}));
    });

    it('should be permanently locked once locked', async function() {
      await this.contract.lockShares({from: owner});
      await this.contract.lockShares({from: owner});
      const locked = await this.contract.sharesLocked();
      assert(locked === true);
    });

    it('should prevent claiming funds when shares unlocked', async function() {
      await web3.eth.sendTransaction(
        {from: somePerson, to: this.contract.address, value: web3.toWei(1, 'ether')}
      );
      await this.contract.setTeamMemberShares(teamMemberOne, 1, {from: owner});
      await this.contract.pause();

      await expectThrow(this.contract.claim({from: teamMemberOne}));
    });

  });

});