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

    it('should allow team members to withdraw funds proportional to their shares', async function() {
      await web3.eth.sendTransaction(
        {from: somePerson, to: this.contract.address, value: web3.toWei(1, 'ether')}
      );

      const teamMemberOneShares = 3;
      const teamMemberTwoShares = 5;
      const teamMemberThreeShares = 2;
      const totalShares = teamMemberOneShares + teamMemberTwoShares + teamMemberThreeShares;

      await this.contract.setTeamMemberShares(teamMemberOne, teamMemberOneShares, {from: owner});
      await this.contract.setTeamMemberShares(teamMemberTwo, teamMemberTwoShares, {from: owner});
      await this.contract.setTeamMemberShares(teamMemberThree, teamMemberThreeShares, {from: owner});

      await this.contract.pause({from: owner});

      let teamMembers = [teamMemberOne, teamMemberTwo, teamMemberThree];
      let teamMemberShares =  [teamMemberOneShares, teamMemberTwoShares, teamMemberThreeShares];

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

    });

    it('should not change total shares', async function() {

    });

    it('should not allow team members to withdraw more than once', async function() {

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

});