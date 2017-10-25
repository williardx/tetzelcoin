'use strict';

import { advanceBlock } from './helpers/advanceToBlock'
import expectThrow from './helpers/expectThrow';
import { increaseTimeTo, duration } from './helpers/increaseTime'
import latestTime from './helpers/latestTime';

const TetzelCrowdsale = artifacts.require('./TetzelCrowdsale.sol');
const TetzelCoin = artifacts.require('./TetzelCoin.sol');

contract('TetzelCrowdsale', function(accounts) {

  const owner = accounts[0];
  const teamWallet = accounts[1];
  const charityWallet = accounts[2];
  const teamPortion = 15;
  const charityPortion = 85;
  const totalTeamMemberAllocation = 15;
  const value = web3.toWei(1, 'ether');
  const rate = 500;
  const expectedTokenAmount = value * rate;

  // Roles for testing
  const teamMember = accounts[3];
  const nonTeamMember = accounts[4];
  const tokenBuyer = accounts[5];
  const somePerson = accounts[6];


  before(async function() {
    await advanceBlock();
  });

  beforeEach(async function() {

    this.startTime = latestTime() + duration.weeks(1);
    this.endTime = this.startTime + duration.weeks(1);
    this.afterEndTime = this.endTime + duration.seconds(1);

    this.token = await TetzelCoin.new();
    this.crowdsale = await TetzelCrowdsale.new(
      this.token.address,
      teamWallet,
      charityWallet,
      teamPortion,
      this.startTime,
      this.endTime,
      rate,
      totalTeamMemberAllocation
    );
    await this.token.addMinter(this.crowdsale.address);
  });

  it('should be ended only after end', async function () {
    let ended = await this.crowdsale.hasEnded();
    assert.equal(ended, false);
    await increaseTimeTo(this.afterEndTime);
    ended = await this.crowdsale.hasEnded();
    assert.equal(ended, true);
  })

  describe('accepting payments', function () {

    it('should reject payments before start', async function () {
      await expectThrow(this.crowdsale.buyTokens(tokenBuyer, {from: tokenBuyer, value: value}));
    });

    it('should accept payments after start', async function () {
      await increaseTimeTo(this.startTime)
      const result = await this.crowdsale.buyTokens(tokenBuyer, {from: tokenBuyer, value: value});
      assert(result);
    });

    it('should reject payments after end', async function () {
      await increaseTimeTo(this.afterEndTime);
      await expectThrow(this.crowdsale.buyTokens(tokenBuyer, {value: value, from: tokenBuyer}));
    });

  });

  describe('buying tokens', function () {

    beforeEach(async function() {
      await increaseTimeTo(this.startTime);
    })

    it('should log purchase', async function () {
      const {logs} = await this.crowdsale.buyTokens(tokenBuyer, {value: value, from: tokenBuyer});

      const event = logs.find(e => e.event === 'LogTokenPurchase');

      assert(event);
      assert.equal(event.args.purchaser, tokenBuyer);
      assert.equal(event.args.beneficiary, tokenBuyer);
      assert.equal(event.args.value, value);
      assert.equal(event.args.amount, expectedTokenAmount);
    })

    it('should increase totalSupply', async function () {
      await this.crowdsale.buyTokens(tokenBuyer, {value: value, from: tokenBuyer});
      const totalSupply = await this.token.totalSupply();
      assert(totalSupply.equals(web3.toBigNumber(expectedTokenAmount)));
    })

    it('should assign tokens to sender', async function () {
      await this.crowdsale.buyTokens(tokenBuyer, {value: value, from: tokenBuyer});
      let balance = await this.token.balanceOf(tokenBuyer);
      assert(balance.equals(web3.toBigNumber(expectedTokenAmount)));
    })

    it('should send X% of funds to team wallet and (1-X)% to charity wallet', async function() {

      const expectedTeamDiff = web3.toBigNumber(web3.toWei(teamPortion / 100, 'ether'));
      const expectedCharityDiff = web3.toBigNumber(web3.toWei(charityPortion / 100, 'ether'));

      const preTeamWalletBalance = web3.eth.getBalance(teamWallet);
      const preCharityWalletBalance = web3.eth.getBalance(charityWallet);
      await this.crowdsale.buyTokens(tokenBuyer, {value: value});
      const postTeamWalletBalance = web3.eth.getBalance(teamWallet);
      const postCharityWalletBalance = web3.eth.getBalance(charityWallet);

      assert(postTeamWalletBalance.minus(preTeamWalletBalance).equals(expectedTeamDiff))
      assert(postCharityWalletBalance.minus(preCharityWalletBalance).equals(expectedCharityDiff))

    });

  });

  describe('registering team members', function() {
    
    it('should only allow owner to register team members', async function() {
      assert.notEqual(await this.crowdsale.owner(), tokenBuyer);
      await expectThrow(
        this.crowdsale.registerTeamMember(tokenBuyer, 1, {from: tokenBuyer})
      );
    });

    it ('should not accept a percent > total allotted percentage of tokens for team', async function() {
      await expectThrow(this.crowdsale.registerTeamMember(teamMember, 100));
    });

    it('should register a team member', async function() {
      await this.crowdsale.registerTeamMember(teamMember, 1, {from: owner});
      const expectedAllocation = 1;
      assert.equal(
        await this.crowdsale.teamMemberTokenAllocation(teamMember), 
        expectedAllocation
      );
    });

    it('should not register any more team members after all allocation is taken', async function() {
      await this.crowdsale.registerTeamMember(teamMember, totalTeamMemberAllocation, {from: owner});
      await expectThrow(this.crowdsale.registerTeamMember(nonTeamMember, 1, {from: owner}));
    });

  });

  describe('removing team members', function() {

    it('should not allow non-owner to remove team members', async function() {
      await expectThrow(this.crowdsale.removeTeamMember(teamMember, {from: somePerson}));
    });

    it('should remove the team member and give back the allocated portion', async function() {
      const allocationPercentage = web3.toBigNumber(1);
      await this.crowdsale.registerTeamMember(teamMember, allocationPercentage, {from: owner});
      const preRemovalTotalAllocation = await this.crowdsale.totalTeamMemberAllocation();
      await this.crowdsale.removeTeamMember(teamMember, {from: owner});
      const postRemovalTotalAllocation = await this.crowdsale.totalTeamMemberAllocation();
      const removedTeamMemberAllocation = await this.crowdsale.teamMemberTokenAllocation(teamMember);
      const expectedRemovedTeamMemberAllocation = web3.toBigNumber(0);
      assert(removedTeamMemberAllocation.equals(expectedRemovedTeamMemberAllocation));
      assert(preRemovalTotalAllocation.plus(allocationPercentage).equals(postRemovalTotalAllocation));
    });

  });

  describe('buying team tokens', function() {

    beforeEach(async function() {
      await increaseTimeTo(this.startTime);
      await this.crowdsale.registerTeamMember(teamMember, 1);
      await this.crowdsale.buyTokens(
        nonTeamMember, {from: nonTeamMember, value: web3.toWei(0.01, 'ether')}
      );
    });

    it('should not allow team members to buy before sale is over', async function() {
      await expectThrow(this.crowdsale.buyTeamTokens({from: teamMember, value: 1}));
    });

    it('should allow team members to buy after sale is over', async function() {
      await increaseTimeTo(this.afterEndTime);
      const boughtAfterEndTime = await this.crowdsale.buyTeamTokens({from: teamMember, value: 1});
      assert(boughtAfterEndTime);
    });

    it('should only allow team members to buy tokens', async function() {
      await increaseTimeTo(this.afterEndTime);
      await expectThrow(this.crowdsale.buyTeamTokens({from: nonTeamMember, value: 1}));
    });

    it('should buy tokens for team member', async function() {
      await increaseTimeTo(this.afterEndTime);
      const preTeamMemberBalance = await this.token.balanceOf(teamMember);
      const teamMemberPercentage = await this.crowdsale.teamMemberTokenAllocation(teamMember);
      const expectedTokenAmount = await this.crowdsale.weiRaised() * rate * teamMemberPercentage / 100;
      await this.crowdsale.buyTeamTokens({from: teamMember, value: 1});
      const postTeamMemberBalance = await this.token.balanceOf(teamMember);
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
      await this.crowdsale.buyTeamTokens({from: teamMember, value: purchaseAmount});
      const postCharityWalletBalance = web3.eth.getBalance(charityWallet);
      assert(postCharityWalletBalance.minus(preCharityWalletBalance).equals(purchaseAmount));
    });

    it("should set team member's allocation back to 0", async function() {
      await increaseTimeTo(this.afterEndTime);
      await this.crowdsale.buyTeamTokens({from: teamMember, value: 1});
      const expectedPostAllocation = web3.toBigNumber(0);
      const postAllocation = await this.crowdsale.teamMemberTokenAllocation(teamMember);
      assert(expectedPostAllocation.equals(postAllocation));
    });

    it('should not change weiRaised', async function() {
      await increaseTimeTo(this.afterEndTime);
      const preWeiRaised = await this.crowdsale.weiRaised();
      await this.crowdsale.buyTeamTokens({from: teamMember, value: 1});
      const postWeiRaised = await this.crowdsale.weiRaised();
      assert(preWeiRaised.equals(postWeiRaised));
    });

  });

});