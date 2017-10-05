import React, { Component } from 'react';
import {
  Container,
  Icon,
  // Header,
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
      tetzelInstance: null,
      tetzelAddress: 'Loading...',
      tetzelCoinAddress: 'Loading...',
      account: 'Loading...',
      sinText: '',
      sinValue: 0,
    };
  }

  async componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    if (this.props.web3) {
      try {
        await this.fetchAccount();
        await this.instantiateContracts();
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
        if (e != null) {
          reject(e);
        } else {
          resolve(accounts);
        }
      });
    });
  }


  async instantiateContracts() {

    const contract = require('truffle-contract');
    const tetzel = contract(Tetzel);
    const tetzelCrowdsale = contract(TetzelCrowdsale);

    tetzel.setProvider(this.props.web3.currentProvider)
    tetzelCrowdsale.setProvider(this.props.web3.currentProvider)

    //TODO: Is there any way to do this without making so many async calls?
    var tetzelInstance = await tetzel.deployed();
    var tetzelCrowdsaleInstance = await tetzelCrowdsale.deployed();
    var tetzelCoinAddress = await tetzelCrowdsaleInstance.token();

    this.setState({
      tetzelInstance: tetzelInstance,
      tetzelAddress: tetzelInstance.address,
      tetzelCoinAddress: tetzelCoinAddress
    });
  }

  async purchase() {

    var sinValue = parseFloat(this.state.sinValue);

    var isValidSin = this.state.sinText.length > 0;
    var isValidPayment = typeof sinValue === 'number' && sinValue > 0;

    if ( !(isValidSin && isValidPayment) ) {
      throw "Invalid confession";
    }

    try {
      var results = await this.state.tetzelInstance.confess(
        this.state.sinText, 
        {
          from: this.state.account, 
          value: this.props.web3.toWei(sinValue, 'ether')
        }
      );
      console.log(results);
    } catch(e) {
      console.log(e);
    }
  }

  updateSinValue(val) {
    this.setState({sinValue: val});
  }

  updateSinText(txt) {
    this.setState({sinText: txt});
  }

  render() {
    return(
      <Container>
        <Link to='/'><Icon name='long arrow left' /> Exit Confession</Link>
        <ConfessSin
          sinText={ this.state.sinText }
          updateSinText={ this.updateSinText.bind(this) }
          onNext={ (txt) => this.setState({sinText: txt}) } />
        <ValueSin
          sinText={ this.state.sinText }
          sinValue={ this.state.sinValue } 
          onNext={ (val) => this.setState({sinValue: val}) } />
        <PurchaseSin
          tetzelAddress={ this.state.tetzelAddress }
          sinValue={ this.state.sinValue }
          updateSinValue={ this.updateSinValue.bind(this) }
          onPurchase={ this.purchase.bind(this) } />
        <Forgiveness />
      </Container>
    );
  }

}