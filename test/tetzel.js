'use strict';

import { advanceBlock } from './helpers/advanceToBlock'
import expectThrow from './helpers/expectThrow';
import {increaseTimeTo, duration} from './helpers/increaseTime'
import latestTime from './helpers/latestTime';

const Tetzel = artifacts.require('./Tetzel.sol');
const TetzelCrowdsale = artifacts.require('./TetzelCrowdsale.sol');
const TetzelCoin = artifacts.require('./TetzelCoin.sol');

contract('Tetzel', function(accounts) {
  let token, crowdsale, tetzel;

  const owner = accounts[0];
  const teamWallet = accounts[1];
  const charityWallet = accounts[2];
  const teamPortion = 15;
  const charityPortion = 85;
  const totalTeamMemberAllocation = 15;
  const value = web3.toWei(1, 'ether');
  const rate = 500;
  const startTime = latestTime();
  const endTime = startTime + duration.weeks(1);

  before(async function() {
    await advanceBlock();
  });

  beforeEach(async function() {
    token = await TetzelCoin.new();
    crowdsale = await TetzelCrowdsale.new(
      token.address,
      teamWallet,
      charityWallet,
      teamPortion,
      charityPortion,
      startTime,
      endTime,
      rate,
      totalTeamMemberAllocation
    );
    tetzel = await Tetzel.new(crowdsale.address);
    await token.addMinter(crowdsale.address);
  });

  describe('confessing', function() {
    const sinner = accounts[4];
    const sin = 'I called my cat fat';
    const sinValue = web3.toWei(0.01, 'ether');

    it('should not accept an empty string', async function() {
      await expectThrow(tetzel.confess('', {from: sinner, value: sinValue}));
    });

    it('should not accept zero payment', async function() {
      await expectThrow(tetzel.confess(sin, {from: sinner, value: 0}));
    });

    it('should buy tokens for the sinner', async function() {
      const preSinBalance = await token.balanceOf(sinner);
      await tetzel.confess(sin, {from: sinner, value: sinValue});
      const postSinBalance = await token.balanceOf(sinner);
      const expectedTokens = sinValue * rate;
      assert(postSinBalance.minus(preSinBalance).equals(expectedTokens));
    });

    it('should log the confession', async function() {
      //TODO
    });

  });

});