import React, { Component } from 'react';
import {
  Container,
  Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Tetzel from '../build/contracts/Tetzel.json';
import TetzelCrowdsale from '../build/contracts/TetzelCrowdsale.json';

import ConfessSin from './components/ConfessSin';
import ValueSin from './components/ValueSin';
import PurchaseSin from './components/PurchaseSin';
import Forgiveness from './components/Forgiveness';

import './css/confess.css';

export default class Confess extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tx: null,
      tetzelInstance: null,
      tetzelAddress: 'Loading...',
      tetzelCoinAddress: 'Loading...',
      account: 'Loading...',
      sinText: '',
      sinValueUSD: 0,
      sinValueETH: 0,
      sinRate: 500,
      testSinValues: [0, 0, 0],
      ethSpotPrice: null,
      pending: false,
      activeView: 'CONFESS_SIN',
    };
  }

  async componentWillMount() {
    if (this.props.web3) {
      try {
        await this.fetchAccount();
        await this.instantiateContracts();
        await this.fetchEtherPrice();        
      } catch(e) {
        console.log(e);
      }      
    }
  }

  async fetchAccount() {

    try {
      var accounts = await this._getAccountsPromise();
    } catch(e) {
      console.log(e);
    }
    
    if (!accounts) {
      throw "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
    }

    this.setState({account: accounts[0]});

  }

  _getAccountsPromise() {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.props.web3.eth.getAccounts(function (e, accounts) {
        if (e !== null) {
          reject(e);
        } else {
          resolve(accounts);
        }
      });
    });
  }

  async fetchEtherPrice() {
    const priceUrl = "https://api.coinbase.com/v2/prices/ETH-USD/spot";
    let response = await fetch(priceUrl);
    let responseJSON = await response.json();
    this.setState({ethSpotPrice: parseFloat(responseJSON.data.amount)});
  }

  async instantiateContracts() {

    const contract = require('truffle-contract');
    const tetzel = contract(Tetzel);
    const tetzelCrowdsale = contract(TetzelCrowdsale);

    tetzel.setProvider(this.props.web3.currentProvider)
    tetzelCrowdsale.setProvider(this.props.web3.currentProvider)

    var tetzelInstance = await tetzel.deployed();
    var tetzelCrowdsaleInstance = await tetzelCrowdsale.deployed();
    var tetzelCoinAddress = await tetzelCrowdsaleInstance.token();

    this.setState({
      tetzelInstance: tetzelInstance,
      tetzelAddress: tetzelInstance.address,
      tetzelCoinAddress: tetzelCoinAddress
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async purchase() {

    var sinValue = parseFloat(this.state.sinValueETH);

    var isValidSin = this.state.sinText.length > 0;
    var isValidPayment = typeof sinValue === 'number' && sinValue > 0;

    if ( !(isValidSin && isValidPayment) ) {
      throw "Invalid confession";
    }

    var txStatus;
    this.setState({pending: true})

    try {

      var results = await this.state.tetzelInstance.confess(
        this.state.sinText,
        {
          from: this.state.account, 
          value: this.props.web3.toWei(sinValue, 'ether')
        }
      );
      
      var isSuccess = false;
      var count = 0;
      while (!isSuccess && count < 9) {
        isSuccess = await this.checkTxSuccess(
          results.tx, results.receipt.blockNumber
        );
        count += 1;
        await this.sleep(5000);
      }

      if (isSuccess) {
        txStatus = {complete: true, msg: ''};
        this.setState({tx: results.tx});
      } else {
        throw 'Transaction failed';
      }

    } catch(e) {
      txStatus = {complete: false, msg: e.message};
    } finally {
      this.setState({pending: false});
    }

    return txStatus;

  }

  /*
  Checks whether or not a transaction succeeded by looking for the `Confess`
  event in the event logs. We need to do this because there's no way to tell
  the difference between a transaction that failed due to out of gas errors 
  on internal transactions but is still successfully mined and a successful
  transaction.

  TODO: Use `web3.eth.filter` once I figure out how to get it working
  with testnet.
  */
  async checkTxSuccess(txHash, blockNumber) {
    var url = `https://ropsten.etherscan.io/api?module=logs&action=getLogs&fromBlock=${blockNumber}&toBlock=${blockNumber}&address=${this.state.tetzelAddress}`;
    var logs = await fetch(url);
    var data = await logs.json();
    var txs = data.result.map((logObj) => logObj.transactionHash);
    var txPresent = data.result.reduce((acc, logObj) => {
        return logObj.transactionHash === txHash || acc
      }, false);
    return txPresent;
  }

  updateSinValue(val, unit) {
    if (unit === 'USD') {
      this.setState({
        sinValueUSD: val,
        sinValueETH: val / this.state.ethSpotPrice
      });      
    } else if (unit === 'ETH') {
      this.setState({
        sinValueUSD: val * this.state.ethSpotPrice,
        sinValueETH: val
      });       
    } else {
      throw "Invalid unit for updateSinValue";
    }
  }

  updateSinText(txt) {
    this.setState({sinText: txt});
  }

  updateTestSinValues(idx, val) {
    var newTestSinValues = this.state.testSinValues.slice();
    newTestSinValues[idx] = val;
    this.setState({testSinValues: newTestSinValues});
  }

  render() {

    const currentView = () => {
      switch(this.state.activeView) {
        case 'CONFESS_SIN':
          return (
            <ConfessSin
              sinText={ this.state.sinText }
              updateSinText={ this.updateSinText.bind(this) }
              onNext={ (txt) => this.setState({activeView: 'VALUE_SIN'}) } />            
          );
        case 'VALUE_SIN':
          return (
            <ValueSin
              sinText={ this.state.sinText }
              sinValueUSD={ this.state.sinValueUSD }
              testSinValues={ this.state.testSinValues }
              updateSinValue={ this.updateSinValue.bind(this) }
              updateTestSinValues={ this.updateTestSinValues.bind(this) }
              onNext={ () => this.setState({activeView: 'PURCHASE_SIN'}) } />
          );
        case 'PURCHASE_SIN':
          return (
            <PurchaseSin
              tetzelAddress={ this.state.tetzelAddress }
              sinRate={ this.state.sinRate }
              sinValueETH={ this.state.sinValueETH }
              sinText={ this.state.sinText }
              ethSpotPrice={ this.state.ethSpotPrice }
              updateSinValue={ this.updateSinValue.bind(this) }
              pending={ this.state.pending }
              onPurchase={ async () => { 
                let responseObj = await this.purchase();
                if (responseObj.complete) {
                  this.setState({activeView: 'FORGIVENESS'})
                } else {
                  console.log(responseObj.msg);
                }

              }} />
          );
        case 'FORGIVENESS':
          return (
            <Forgiveness 
              tx={ this.state.tx }
              web3={ this.props.web3 }
              tokenAmount={ this.state.sinValueETH * this.state.sinRate } />
          );
      }
    }

    const ConfessionNav = () => {
      return(
        <div className='icon-wrapper'>
          <Icon
            onClick={ () => this.setState({activeView: 'CONFESS_SIN'}) } 
            name={ this.state.activeView === 'CONFESS_SIN' ? 'circle' : 'circle thin'} />
          <Icon
            onClick={ () => this.setState({activeView: 'VALUE_SIN'}) } 
            name={ this.state.activeView === 'VALUE_SIN' ? 'circle' : 'circle thin'} />
          <Icon
            onClick={ () => this.setState({activeView: 'PURCHASE_SIN'}) } 
            name={ 
              (this.state.activeView === 'PURCHASE_SIN' 
              || this.state.activeView === 'FORGIVENESS') ? 'circle' : 'circle thin'} />
        </div>
      );
    }

    return(
      <Container className='confess-wrapper'>
        <Link className='arrow-link exit-link' to='/'><Icon name='long arrow left' /> Exit Confession</Link>
        { currentView() }
        { ConfessionNav() }
      </Container>
    );
  }

}