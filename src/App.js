import React, { Component } from 'react'
import Tetzel from '../build/contracts/Tetzel.json'
import TetzelCrowdsale from '../build/contracts/TetzelCrowdsale.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      tetzelInstance: null,
      tetzelCoinAddress: null,
    }
  }

  async componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    try {
      var web3 = await getWeb3;
      this.setState({web3: web3.web3});
      await this.instantiateContracts();
    } catch(e) {
      console.log(e);
    }
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

    var tetzelInstance = await tetzel.deployed();
    var tetzelCrowdsaleAddress = await tetzelInstance.crowdsale.call();
    var tetzelCrowdsaleInstance = await tetzelCrowdsale.at(tetzelCrowdsaleAddress);
    var tetzelCoinAddress = await tetzelCrowdsaleInstance.token.call();

    this.setState({
      tetzelInstance: tetzelInstance,
      tetzelCoinAddress: tetzelCoinAddress
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
