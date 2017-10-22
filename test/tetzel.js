'use strict';

import expectThrow from './helpers/expectThrow';
import {increaseTimeTo, duration} from './helpers/increaseTime'

const Tetzel = artifacts.require('./Tetzel.sol');
const TetzelCrowdsale = artifacts.require('./TetzelCrowdsale.sol');
const TetzelCoin = artifacts.require('./TetzelCoin.sol');

contract('Tetzel', function(accounts) {
  let token, crowdsale, tetzel;

  let rate = 500;

  beforeEach(async function() {
    token = await TetzelCoin.new();
    crowdsale = await TetzelCrowdsale.new(token.address);
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