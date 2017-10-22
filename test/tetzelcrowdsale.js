'use strict';

import { advanceBlock } from './helpers/advanceToBlock'
import expectThrow from './helpers/expectThrow';
import { increaseTimeTo, duration } from './helpers/increaseTime'
import latestTime from './helpers/latestTime';

const TetzelCrowdsale = artifacts.require('./TetzelCrowdsale.sol');
const TetzelCoin = artifacts.require('./TetzelCoin.sol');

contract('TetzelCrowdsale', function(accounts) {

  let token, crowdsale;

  const owner = accounts[0];
  const teamWallet = accounts[1];
  const charityWallet = accounts[2];
  const teamPortion = 15;
  const charityPortion = 85;
  const totalTeamMemberAllocation = 15;
  const value = web3.toWei(1, 'ether');
  const rate = 500;

  // Roles for testing
  const teamMember = accounts[3];
  const nonTeamMember = accounts[4];
  const tokenBuyer = accounts[5];
  const somePerson = accounts[6];


  before(async function() {
    await advanceBlock();
  });

  beforeEach(async function() {

    this.startTime = latestTime();
    this.endTime = this.startTime + duration.weeks(1);
    this.afterEndTime = this.endTime + duration.seconds(1);

    token = await TetzelCoin.new();
    crowdsale = await TetzelCrowdsale.new(
      token.address,
      teamWallet,
      charityWallet,
      teamPortion,
      charityPortion,
      this.startTime,
      this.endTime,
      rate,
      totalTeamMemberAllocation
    );
    await token.addMinter(crowdsale.address);
  });

  describe('forwarding funds', function() {

    it('should send X% of funds to team wallet and (1-X)% to charity wallet', async function() {

      const expectedTeamDiff = web3.toBigNumber(web3.toWei(teamPortion / 100, 'ether'));
      const expectedCharityDiff = web3.toBigNumber(web3.toWei(charityPortion / 100, 'ether'));

      const preTeamWalletBalance = web3.eth.getBalance(teamWallet);
      const preCharityWalletBalance = web3.eth.getBalance(charityWallet);
      await crowdsale.buyTokens(tokenBuyer, {value: value});
      const postTeamWalletBalance = web3.eth.getBalance(teamWallet);
      const postCharityWalletBalance = web3.eth.getBalance(charityWallet);

      assert(postTeamWalletBalance.minus(preTeamWalletBalance).equals(expectedTeamDiff))
      assert(postCharityWalletBalance.minus(preCharityWalletBalance).equals(expectedCharityDiff))

    });

  });

  describe('registering team members', function() {
    
    it('should only allow owner to register team members', async function() {
      assert.notEqual(await crowdsale.owner(), tokenBuyer);
      await expectThrow(
        crowdsale.registerTeamMember(tokenBuyer, 1, {from: tokenBuyer})
      );
    });

    it ('should not accept a percent > total allotted percentage of tokens for team', async function() {
      await expectThrow(crowdsale.registerTeamMember(teamMember, 100));
    });

    it('should register a team member', async function() {
      await crowdsale.registerTeamMember(teamMember, 1, {from: owner});
      const expectedAllocation = 1;
      assert.equal(
        await crowdsale.teamMemberTokenAllocation(teamMember), 
        expectedAllocation
      );
    });

    it('should not register any more team members after all allocation is taken', async function() {
      await crowdsale.registerTeamMember(teamMember, totalTeamMemberAllocation, {from: owner});
      await expectThrow(crowdsale.registerTeamMember(nonTeamMember, 1, {from: owner}));
    });

  });

  describe('removing team members', function() {

    it('should not allow non-owner to remove team members', async function() {
      await expectThrow(crowdsale.removeTeamMember(teamMember, {from: somePerson}));
    });

    it('should remove the team member and give back the allocated portion', async function() {
      const allocationPercentage = web3.toBigNumber(1);
      await crowdsale.registerTeamMember(teamMember, allocationPercentage, {from: owner});
      const preRemovalTotalAllocation = await crowdsale.totalTeamMemberAllocation();
      await crowdsale.removeTeamMember(teamMember, {from: owner});
      const postRemovalTotalAllocation = await crowdsale.totalTeamMemberAllocation();
      const removedTeamMemberAllocation = await crowdsale.teamMemberTokenAllocation(teamMember);
      const expectedRemovedTeamMemberAllocation = web3.toBigNumber(0);
      assert(removedTeamMemberAllocation.equals(expectedRemovedTeamMemberAllocation));
      assert(preRemovalTotalAllocation.plus(allocationPercentage).equals(postRemovalTotalAllocation));
    });

  });

  describe('buying team tokens', function() {

    beforeEach(async function() {
      await crowdsale.registerTeamMember(teamMember, 1);
      await crowdsale.buyTokens(
        nonTeamMember, {from: nonTeamMember, value: web3.toWei(0.01, 'ether')}
      );
    });

    it('should not allow team members to buy before sale is over', async function() {
      await expectThrow(crowdsale.buyTeamTokens({from: teamMember, value: 1}));
    });

    it('should allow team members to buy after sale is over', async function() {
      await increaseTimeTo(this.afterEndTime);
      const boughtAfterEndTime = await crowdsale.buyTeamTokens({from: teamMember, value: 1});
      assert(boughtAfterEndTime);
    });

    it('should only allow team members to buy tokens', async function() {
      await increaseTimeTo(this.afterEndTime);
      await expectThrow(crowdsale.buyTeamTokens({from: nonTeamMember, value: 1}));
    });

    it('should buy tokens for team member', async function() {
      await increaseTimeTo(this.afterEndTime);
      const preTeamMemberBalance = await token.balanceOf(teamMember);
      const teamMemberPercentage = await crowdsale.teamMemberTokenAllocation(teamMember);
      const expectedTokenAmount = await crowdsale.weiRaised() * rate * teamMemberPercentage / 100;
      await crowdsale.buyTeamTokens({from: teamMember, value: 1});
      const postTeamMemberBalance = await token.balanceOf(teamMember);
      const teamMemberReceivedTokens = postTeamMemberBalance.minus(preTeamMemberBalance).equals(expectedTokenAmount)
      assert(teamMemberReceivedTokens);
    });

    it('should log the purchase', function() {
      //TODO
    });

    it('should send all money to charity', async function() {
      await increaseTimeTo(this.afterEndTime);
      const preCharityWalletBalance = web3.eth.getBalance(charityWallet);
      const purchaseAmount = web3.toWei(1, 'ether');
      await crowdsale.buyTeamTokens({from: teamMember, value: purchaseAmount});
      const postCharityWalletBalance = web3.eth.getBalance(charityWallet);
      assert(postCharityWalletBalance.minus(preCharityWalletBalance).equals(purchaseAmount));
    });

    it("should set team member's allocation back to 0", async function() {
      await increaseTimeTo(this.afterEndTime);
      await crowdsale.buyTeamTokens({from: teamMember, value: 1});
      const expectedPostAllocation = web3.toBigNumber(0);
      const postAllocation = await crowdsale.teamMemberTokenAllocation(teamMember);
      assert(expectedPostAllocation.equals(postAllocation));
    });

    it('should not change weiRaised', async function() {
      await increaseTimeTo(this.afterEndTime);
      const preWeiRaised = await crowdsale.weiRaised();
      await crowdsale.buyTeamTokens({from: teamMember, value: 1});
      const postWeiRaised = await crowdsale.weiRaised();
      assert(preWeiRaised.equals(postWeiRaised));
    });

  });

});