'use strict';

import expectThrow from './helpers/expectThrow';

const TetzelCrowdsale = artifacts.require('./TetzelCrowdsale.sol');
const TetzelCoin = artifacts.require('./TetzelCoin.sol');

contract('TetzelCrowdsale', function(accounts) {
  let crowdsale, token;

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

    it('should send 15% of funds to team wallet and 85% to charity wallet', async function() {

      const expectedTeamDiff = web3.toBigNumber(web3.toWei(0.15, 'ether'));
      const expectedCharityDiff = web3.toBigNumber(web3.toWei(0.85, 'ether'));

      const preTeamWalletBalance = web3.eth.getBalance(teamWallet);
      const preCharityWalletBalance = web3.eth.getBalance(charityWallet);
      await crowdsale.buyTokens(accounts[0], {value: web3.toWei(1, 'ether')});
      const postTeamWalletBalance = web3.eth.getBalance(teamWallet);
      const postCharityWalletBalance = web3.eth.getBalance(charityWallet);

      assert(postTeamWalletBalance.minus(preTeamWalletBalance).equals(expectedTeamDiff))
      assert(postCharityWalletBalance.minus(preCharityWalletBalance).equals(expectedCharityDiff))

    });

  });

});