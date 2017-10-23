import React, { Component } from 'react';
import {
  Container,
  Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Tetzel from '../build/contracts/Tetzel.json';
import TetzelCrowdsale from '../build/contracts/TetzelCrowdsale.json';

import TermsAndConditionsModal from './components/TermsAndConditionsModal';
import ConfessSin from './components/ConfessSin';
import ValueSin from './components/ValueSin';
import PurchaseSin from './components/PurchaseSin';
import Forgiveness from './components/Forgiveness';

import './css/confess.css';

export default class Confess extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
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
        this.setState({errorMsg: e.message});
      }      
    }
  }

  async fetchAccount() {

    const errorMsg = 'We couldn\`t find your account.' + 
                     'Please check MetaMask or your Web3 provider.';

    try {
      var accounts = await this._getAccountsPromise();
    } catch(e) {
      this.setState({errorMsg: errorMsg});
    }
    
    if (!accounts) {
      this.setState({errorMsg: errorMsg});
    } else {
      this.setState({account: accounts[0]});
    }

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

    if (!isValidSin) {
      throw new Error('Your sin is not valid. Please confess before buying SIN tokens.');
    }

    if (!isValidPayment) {
      throw new Error('Please enter a payment amount greater than 0.');
    }

    try {

      const txHash = await this.state.tetzelInstance.confess.sendTransaction(
        this.state.sinText,
        {
          from: this.state.account, 
          value: this.props.web3.toWei(sinValue, 'ether'),
          gas: 200000,
        }
      );
      this.setState({tx: txHash, pending: true});
      
      var isSuccess = false;
      var count = 0;

      while(!isSuccess && count < 9) {
        var txReceipt = await this.getTransactionReceipt(txHash);
        if (txReceipt !== null) {
          isSuccess = this.checkTxSuccess(txReceipt);
          if (isSuccess) break;
        }
        count += 1;
        await this.sleep(5000);
      }

      var txStatus;

      if (isSuccess) {
        txStatus = {complete: true, msg: ''};
      } else {
        throw new Error('Transaction failed. Please check Etherscan for more details. Transaction hash: ' + this.state.tx);
      }

    } catch(e) {
      txStatus = {complete: false, msg: e.message};
    } finally {
      this.setState({pending: false});
    }

    return txStatus;

  }

  /*
  Checks whether or not a transaction succeeded by looking for an event (`Confess`)
  triggered by the Tetzel contract. We need to do this because there's no way to tell
  the difference between a transaction that failed due to out of gas errors 
  on internal transactions but is still successfully mined and a successful
  transaction.
  */
  checkTxSuccess(txReceipt) {
    return txReceipt.logs.reduce((acc, logObj) => {
      return logObj.address === this.state.tetzelAddress || acc
    }, false);
  }

  /*
  Promisified version of web3's getTransactionReceipt
  */
  getTransactionReceipt(txHash) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.props.web3.eth.getTransactionReceipt(txHash, function (err, result) {
        if (err !== null) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
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
      throw new Error("Invalid unit for updateSinValue");
    }
  }

  updateSinText(txt) {
    this.setState({sinText: txt});
  }

  validateSinText() {
    return this.state.sinText.length > 0;
  }

  handleInvalidSinText() {
    this.setState({errorMsg: 'Please confess before moving on.'});
  }

  updateTestSinValues(idx, val) {
    var newTestSinValues = this.state.testSinValues.slice();
    newTestSinValues[idx] = val;
    this.setState({testSinValues: newTestSinValues});
  }

  changeActiveView(nextView) {
    const validViews = ['CONFESS_SIN', 'VALUE_SIN', 'PURCHASE_SIN', 'FORGIVENESS'];
    if (validViews.indexOf(nextView) === -1) {
      throw new Error('Invalid view');
    }

    // Validating sin text input shouldn't have to occur here, but it does
    // with the way this is currently set up
    // TODO: Refactor this
    if (this.state.activeView === 'CONFESS_SIN' && !this.validateSinText()) {
      this.handleInvalidSinText();
    } else {
      this.setState({activeView: nextView, errorMsg: ''});
    }
  }

  render() {

    const showActiveView = () => {
      switch(this.state.activeView) {
        case 'CONFESS_SIN':
          return (
            <ConfessSin
              errorMsg={ this.state.errorMsg }
              sinText={ this.state.sinText }
              updateSinText={ this.updateSinText.bind(this) }
              onNext={ () => this.changeActiveView('VALUE_SIN') } />            
          );
        case 'VALUE_SIN':
          return (
            <ValueSin
              sinText={ this.state.sinText }
              sinValueUSD={ this.state.sinValueUSD }
              testSinValues={ this.state.testSinValues }
              updateSinValue={ this.updateSinValue.bind(this) }
              updateTestSinValues={ this.updateTestSinValues.bind(this) }
              onNext={ () => this.changeActiveView('PURCHASE_SIN') } />
          );
        case 'PURCHASE_SIN':
          return (
            <PurchaseSin
              errorMsg={ this.state.errorMsg }
              tetzelAddress={ this.state.tetzelAddress }
              sinRate={ this.state.sinRate }
              sinValueETH={ this.state.sinValueETH }
              sinText={ this.state.sinText }
              ethSpotPrice={ this.state.ethSpotPrice }
              updateSinValue={ this.updateSinValue.bind(this) }
              pending={ this.state.pending }
              tx={ this.state.tx }
              onPurchase={ async () => {
                this.setState({errorMsg: ''});
                try {
                  let responseObj = await this.purchase();
                  if (responseObj.complete) {
                    this.changeActiveView('FORGIVENESS');
                  } else {
                    throw new Error(responseObj.msg);
                  }
                } catch(e) {
                  this.setState({errorMsg: e.message});
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
            onClick={ () => this.changeActiveView('CONFESS_SIN') } 
            name={ this.state.activeView === 'CONFESS_SIN' ? 'circle' : 'circle thin'} />
          <Icon
            onClick={ () => this.changeActiveView('VALUE_SIN') } 
            name={ this.state.activeView === 'VALUE_SIN' ? 'circle' : 'circle thin'} />
          <Icon
            onClick={ () => this.changeActiveView('PURCHASE_SIN') } 
            name={ 
              (this.state.activeView === 'PURCHASE_SIN' 
              || this.state.activeView === 'FORGIVENESS') ? 'circle' : 'circle thin'} />
        </div>
      );
    }

    return(
      <Container className='confess-wrapper'>
        <TermsAndConditionsModal />
        <div className='confess-top'>
          <Link className='arrow-link exit-link' to='/'><Icon name='long arrow left' /> Exit Confession</Link>
        </div>
        <div className='confess-content'>
          { showActiveView() }
        </div>
        <div className='confess-footer'>
          { ConfessionNav() }
        </div>
      </Container>
    );
  }

}