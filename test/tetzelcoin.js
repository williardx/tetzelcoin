'use strict';

import expectThrow from './helpers/expectThrow';
var TetzelCoin = artifacts.require('./TetzelCoin.sol');

contract('TetzelCoin', function(accounts) {
  let token;

  beforeEach(async function() {
    token = await TetzelCoin.new();
  });

  describe('mint tokens', function() {
    it('should mint a given amount of tokens to a given address', async function() {
      await token.addMinter(accounts[0]);
      const result = await token.mint(accounts[1], 100);
      assert.equal(result.logs[0].event, 'Mint');
      assert.equal(result.logs[0].args.to.valueOf(), accounts[1]);
      assert.equal(result.logs[0].args.amount.valueOf(), 100);
      assert.equal(result.logs[1].event, 'Transfer');
      assert.equal(result.logs[1].args.from.valueOf(), 0x0);

      let balance0 = await token.balanceOf(accounts[0]);
      assert(balance0, 100);

      let totalSupply = await token.totalSupply();
      assert(totalSupply, 100);
    });

    it('should not mint tokens for unregistered minters', async function() {
      assert.equal(await token.minters(accounts[0]), false);
      await expectThrow(token.mint(accounts[0], 100));
    });

  });

  describe('add minters', function() {
  
    it('should let the owner add an address to minters', async function() {
      assert.equal(await token.owner(), accounts[0]);
      assert.equal(await token.minters(accounts[1]), false);
      await token.addMinter(accounts[1]);
      assert.equal(await token.minters(accounts[1]), true);
    });

    it('should not let a non-owner address add an address to minters', async function() {
      assert.notEqual(await token.owner(), accounts[1]);
      await expectThrow(token.addMinter(accounts[1], {from: accounts[1]}));
    });

  });

  describe('remove minters', function() {

    before(async function() {
      await token.addMinter(accounts[2]);
    });

    it('should allow the owner to remove a minter', async function() {
      assert.equal(await token.owner(), accounts[0]);
      await token.removeMinter(accounts[2]);
      assert.equal(await token.minters(accounts[2]), false);
    });

    it('should not allow a non-owner to remove a minter', async function() {
      assert.notEqual(await token.owner(), accounts[1]);
      await expectThrow(token.removeMinter(accounts[2], {from: accounts[1]}));
    });
  });

});
