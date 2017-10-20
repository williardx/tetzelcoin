'use strict';

import expectThrow from './helpers/expectThrow';

const TetzelCrowdsale = artifacts.require('./TetzelCrowdsale.sol');
const TetzelCoin = artifacts.require('./TetzelCoin.sol');

contract('TetzelCrowdsale', function(accounts) {
  let crowdsale, token;

  const teamPortion = 0.15;
  const charityPortion = 0.85;
  const totalTeamMemberAllocation = 15;
  const value = web3.toWei(1, 'ether');
  const owner = accounts[0];

  beforeEach(async function() {
    token = await TetzelCoin.new();
    crowdsale = await TetzelCrowdsale.new(token.address);
    await token.addMinter(crowdsale.address);
  });

  describe('forwarding funds', function() {
    let teamWallet, charityWallet;

    beforeEach(async function() {
      teamWallet = await crowdsale.teamWallet();
      charityWallet = await crowdsale.charityWallet();
    });

    it('should send X% of funds to team wallet and (1-X)% to charity wallet', async function() {

      const expectedTeamDiff = web3.toBigNumber(web3.toWei(teamPortion, 'ether'));
      const expectedCharityDiff = web3.toBigNumber(web3.toWei(charityPortion, 'ether'));

      const preTeamWalletBalance = web3.eth.getBalance(teamWallet);
      const preCharityWalletBalance = web3.eth.getBalance(charityWallet);
      await crowdsale.buyTokens(accounts[0], {value: value});
      const postTeamWalletBalance = web3.eth.getBalance(teamWallet);
      const postCharityWalletBalance = web3.eth.getBalance(charityWallet);

      assert(postTeamWalletBalance.minus(preTeamWalletBalance).equals(expectedTeamDiff))
      assert(postCharityWalletBalance.minus(preCharityWalletBalance).equals(expectedCharityDiff))

    });

  });

  describe('registering team members', function() {
    
    it('should only allow owner to register team members', async function() {
      assert.notEqual(await crowdsale.owner(), accounts[1]);
      await expectThrow(
        crowdsale.registerTeamMember(accounts[1], 1, {from: accounts[1]})
      );
    });

    it ('should not accept a percent > total allotted percentage of tokens for team', async function() {
      await expectThrow(crowdsale.registerTeamMember(accounts[1], 100));
    });

    it('should register a team member', async function() {
      await crowdsale.registerTeamMember(accounts[1], 1, {from: owner});
      const expectedAllocation = 1;
      assert.equal(
        await crowdsale.teamMemberTokenAllocation(accounts[1]), 
        expectedAllocation
      );
    });

    it('should not register any more team members after all allocation is taken', async function() {
      await crowdsale.registerTeamMember(accounts[1], totalTeamMemberAllocation, {from: owner});
      await expectThrow(crowdsale.registerTeamMember(accounts[2], 1, {from: owner}));
    });

  });

  describe('removing team members', function() {

    it('should not allow non-owner to remove team members', async function() {
      await expectThrow(crowdsale.removeTeamMember(accounts[2], {from: accounts[1]}));
    });

    it('should remove the team member and give back the allocated portion', async function() {
      const allocationPercentage = web3.toBigNumber(1);
      await crowdsale.registerTeamMember(accounts[1], allocationPercentage, {from: owner});
      const preRemovalTotalAllocation = await crowdsale.totalTeamMemberAllocation();
      await crowdsale.removeTeamMember(accounts[1], {from: owner});
      const postRemovalTotalAllocation = await crowdsale.totalTeamMemberAllocation();
      const removedTeamMemberAllocation = await crowdsale.teamMemberTokenAllocation(accounts[1]);
      const expectedRemovedTeamMemberAllocation = web3.toBigNumber(0);
      assert(removedTeamMemberAllocation.equals(expectedRemovedTeamMemberAllocation));
      assert(preRemovalTotalAllocation.plus(allocationPercentage).equals(postRemovalTotalAllocation));
    });

  });

  describe('buying team tokens', function() {
    let teamWallet, charityWallet;

    beforeEach(async function() {
      teamWallet = await crowdsale.teamWallet();
      charityWallet = await crowdsale.charityWallet();
    });

    it('should not allow team members to buy before sale is over', function() {
      
    });

    it('should allow team members to buy after sale is over', function() {

    });

    it('should buy tokens for team member as previously set in team member token allocations', function() {

    });

    it('should log purchase', function() {

    });

    it('should send all money to charity', function() {

    });

  });

});