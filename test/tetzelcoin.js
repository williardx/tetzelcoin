'use strict';

import expectThrow from './helpers/expectThrow';
var TetzelCoin = artifacts.require('./TetzelCoin.sol');

contract('TetzelCoin', function(accounts) {
  let token;
  let owner = accounts[0];
  let minterOne = accounts[1];
  let minterTwo = accounts[2];
  let tokenRecipient = accounts[3];

  beforeEach(async function() {
    token = await TetzelCoin.new();
  });

  describe('mint tokens', function() {
    it('should mint a given amount of tokens to a given address', async function() {
      await token.addMinter(minterOne, {from: owner});
      const result = await token.mint(tokenRecipient, 100, {from: minterOne});
      assert.equal(result.logs[0].event, 'Mint');
      assert.equal(result.logs[0].args.to.valueOf(), tokenRecipient);
      assert.equal(result.logs[0].args.amount.valueOf(), 100);
      assert.equal(result.logs[1].event, 'Transfer');
      assert.equal(result.logs[1].args.from.valueOf(), 0x0);

      let balance0 = await token.balanceOf(owner);
      assert(balance0, 100);

      let totalSupply = await token.totalSupply();
      assert(totalSupply, 100);
    });

    it('should not mint tokens for unregistered minters', async function() {
      assert.equal(await token.minters(minterOne), false);
      await expectThrow(token.mint(tokenRecipient, 100, {from: minterOne}));
    });

  });

  describe('add minters', function() {
  
    it('should let the owner add an address to minters', async function() {
      assert.equal(await token.owner(), owner);
      assert.equal(await token.minters(minterOne), false);
      await token.addMinter(minterOne);
      assert.equal(await token.minters(minterOne), true);
    });

    it('should not let a non-owner address add an address to minters', async function() {
      assert.notEqual(await token.owner(), minterOne);
      await expectThrow(token.addMinter(minterOne, {from: minterOne}));
    });

  });

  describe('remove minters', function() {

    before(async function() {
      await token.addMinter(minterTwo);
    });

    it('should allow the owner to remove a minter', async function() {
      assert.equal(await token.owner(), owner);
      await token.removeMinter(minterTwo);
      assert.equal(await token.minters(minterTwo), false);
    });

    it('should not allow a non-owner to remove a minter', async function() {
      assert.notEqual(await token.owner(), minterOne);
      await expectThrow(token.removeMinter(minterTwo, {from: minterOne}));
    });
  });

  describe('pausing', function() {

    it('should start out unpaused', async function() {
      const paused = await token.paused();
      assert(paused === false);
    });

    it('should let the owner pause', async function() {
      await token.pause({from: owner});
      const paused = await token.paused();
      assert(paused === true);
    });

    it('should not let non-owners pause', async function() {
      await expectThrow(token.pause({from: minterOne}));
    });

    it('should prevent tokens from being minted', async function() {
      await token.addMinter(minterOne, {from: owner});
      await token.pause({from: owner});
      await expectThrow(token.mint(tokenRecipient, 1, {from: minterOne}));
    });

  });

});
