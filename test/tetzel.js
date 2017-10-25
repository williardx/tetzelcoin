'use strict';

import { advanceBlock } from './helpers/advanceToBlock'
import expectThrow from './helpers/expectThrow';
import {increaseTimeTo, duration} from './helpers/increaseTime'
import latestTime from './helpers/latestTime';

const Tetzel = artifacts.require('./Tetzel.sol');
const TetzelCrowdsale = artifacts.require('./TetzelCrowdsale.sol');
const TetzelCoin = artifacts.require('./TetzelCoin.sol');

contract('Tetzel', function(accounts) {

  const owner = accounts[0];
  const teamWallet = accounts[1];
  const charityWallet = accounts[2];
  const teamPortion = 15;
  const totalTeamMemberAllocation = 15;
  const value = web3.toWei(1, 'ether');
  const rate = 500;
  const startTime = latestTime();
  const endTime = startTime + duration.weeks(1);

  const sinRecipient = accounts[3];
  const sinner = accounts[4];
  const somePerson = accounts[5];
  const sin = 'I called my cat fat';
  const sinValue = web3.toWei(0.01, 'ether');

  before(async function() {
    await advanceBlock();
  });

  beforeEach(async function() {
    this.token = await TetzelCoin.new();
    this.crowdsale = await TetzelCrowdsale.new(
      this.token.address,
      teamWallet,
      charityWallet,
      teamPortion,
      startTime,
      endTime,
      rate,
      totalTeamMemberAllocation
    );
    this.tetzel = await Tetzel.new(this.crowdsale.address);
    await this.token.addMinter(this.crowdsale.address);
    await this.crowdsale.setTokenBuyer(this.tetzel.address);
  });

  describe('confessing', function() {

    it('should not accept an empty string', async function() {
      await expectThrow(this.tetzel.confess(sinner, '', {from: sinner, value: sinValue}));
    });

    it('should not accept zero payment', async function() {
      await expectThrow(this.tetzel.confess(sinner, sin, {from: sinner, value: 0}));
    });

    it('should buy tokens for the sinner', async function() {
      const preSinBalance = await this.token.balanceOf(sinner);
      await this.tetzel.confess(sinner, sin, {from: sinner, value: sinValue});
      const postSinBalance = await this.token.balanceOf(sinner);
      const expectedTokens = sinValue * rate;
      assert(postSinBalance.minus(preSinBalance).equals(expectedTokens));
    });

    it('should allow the sinner to designate the SIN tokens for a recepient', async function() {
      const preSinBalance = await this.token.balanceOf(sinRecipient);
      await this.tetzel.confess(sinRecipient, sin, {from: sinner, value: sinValue});
      const postSinBalance = await this.token.balanceOf(sinRecipient);
      const expectedTokens = sinValue * rate;
      assert(postSinBalance.minus(preSinBalance).equals(expectedTokens));
    });

    it('should log the confession', async function() {
      //TODO
    });

  });

  describe('setting crowdsale', function() {

    let newCrowdsale;

    beforeEach(async function() {
      newCrowdsale = await TetzelCrowdsale.new(
        this.token.address,
        teamWallet,
        charityWallet,
        teamPortion,
        startTime,
        endTime,
        rate,
        totalTeamMemberAllocation
      );
    });

    it('should let owner set crowdsale', async function() {
      const preCrowdsale = await this.tetzel.crowdsale();
      assert.equal(preCrowdsale, this.crowdsale.address);
      await this.tetzel.setCrowdsale(newCrowdsale.address);
      const postCrowdsale = await this.tetzel.crowdsale();
      assert.equal(postCrowdsale, newCrowdsale.address);
    });

    it('should not let non-owner set crowdsale', async function() {
      await expectThrow(this.tetzel.setCrowdsale(newCrowdsale.address, {from: somePerson}));
    });

  }); 

});