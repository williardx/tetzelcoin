import React, { Component } from 'react'
import Tetzel from '../build/contracts/Tetzel.json'
import TetzelCrowdsale from '../build/contracts/TetzelCrowdsale.json'
import getWeb3 from './utils/getWeb3'
import ConfessionBox from './components/ConfessionBox'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      tetzelInstance: null,
      tetzelCoinAddress: null,
      account: null,
    }
  }

  async componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    try {
      var web3 = await getWeb3;
      this.setState({web3: web3.web3});
      await this.fetchAccount();
      await this.instantiateContracts();
    } catch(e) {
      console.log(e);
    }
  }

  async fetchAccount() {

    try {
      var accounts = await this.getAccountsPromise();
    } catch(e) {
      console.log(e);
    }
    
    if (!accounts) {
      throw "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
    }

    this.setState({account: accounts[0]});

  }

  getAccountsPromise() {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.state.web3.eth.getAccounts(function (e, accounts) {
        if (e != null) {
          reject(e);
        } else {
          resolve(accounts);
        }
      });
    });
  }

  async instantiateContracts() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const tetzel = contract(Tetzel)
    const tetzelCrowdsale = contract(TetzelCrowdsale)

    tetzel.setProvider(this.state.web3.currentProvider)
    tetzelCrowdsale.setProvider(this.state.web3.currentProvider)

    //TODO: Is there any way to do this without making so many async calls?
    var tetzelInstance = await tetzel.deployed();
    var tetzelCrowdsaleAddress = await tetzelInstance.crowdsale.call();
    var tetzelCrowdsaleInstance = await tetzelCrowdsale.at(tetzelCrowdsaleAddress);
    var tetzelCoinAddress = await tetzelCrowdsaleInstance.token.call();

    this.setState({
      tetzelInstance: tetzelInstance,
      tetzelCoinAddress: tetzelCoinAddress
    });
  }

  async confess(sin, payment) {

    var isValidSin = typeof sin === "string" && sin.length > 0;
    var isValidPayment = typeof payment === "number" && payment > 0;

    if ( !(isValidSin && isValidPayment) ) {
      throw "Invalid confession";
    }

    try {
      var results = await this.state.tetzel.confess(
        sin, {from: this.state.account, value: this.state.web3.toWei(payment, 'ether')}
      );
      console.log(results);
    } catch(e) {
      console.log(e);
    }
  }   

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">TetzelCoin</a>
        </nav>

        <main className="container">
          <ConfessionBox 
            tokenAddress={ this.state.tetzelCoinAddress } 
            onConfess={ this.confess } />
        </main>
      </div>
    );
  }
}

export default App
