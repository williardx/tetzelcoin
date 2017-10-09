import React, { Component } from 'react';
import {
  Button,
  Container,
  Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SinsTable from './components/SinsTable';
import Navbar from './components/Navbar';

import Tetzel from '../build/contracts/Tetzel.json';
import TetzelCrowdsale from '../build/contracts/TetzelCrowdsale.json';

import './css/dswallau.css';
import './css/sinstable.css';

export default class Sins extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tetzelAddress: null,
      tetzelInstance: null,
      recentSins: [],
    };
  }

  async componentWillMount() {
    if (this.props.web3) {
      await this.instantiateContracts();
      // TODO: Figure out why filter isn't working with Metamask and testnet.
      // For now we're pulling sins from Etherscan instead when we're
      // on testnet.
      if (this.props.web3.version.network === '3') { // Ropsten
        await this.getSinsFromEtherscan();
      } else {
        await this.getSinsFromTestRPC();
      }
    }
  }

  _getBlockTimestamp(blockNumber) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.props.web3.eth.getBlock(blockNumber, function(err, results) {
        if (err !== null) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async instantiateContracts() {

    const contract = require('truffle-contract');
    const tetzel = contract(Tetzel);

    tetzel.setProvider(this.props.web3.currentProvider)
    var tetzelInstance = await tetzel.deployed();

    this.setState({
      tetzelInstance: tetzelInstance,
      tetzelAddress: tetzelInstance.address,
    });
  }  

  async getSinsFromTestRPC() {
    
    var sinFilter = this.props.web3.eth.filter({
      address: this.state.tetzelInstance.address,
      fromBlock: 1,
      toBlock: 'latest'
    });

    sinFilter.watch(async (err, event) => {
      if (err !== null) throw "There was an error getting event logs";
      this.setState({ recentSins: [...this.state.recentSins, this.processConfessEvent(event)] });
    });

  }

  processConfessEvent(event) {
    return {
      timestamp: parseInt(event.timeStamp, 16),
      sinner: "0x" + event.topics[1].replace(/^0x0+/, ""),
      sin: this.props.web3.toUtf8(event.data.replace(/^0x0+\d0+/, '')),
      payment: this.props.web3.fromWei(parseInt(event.topics[2], 16), 'ether'),
    };
  }

  async getSinsFromEtherscan(fromBlock, toBlock) {
    if (typeof toBlock === 'undefined') toBlock = 'latest';
    if (typeof fromBlock === 'undefined') fromBlock = 1800000;
    let url = `https://ropsten.etherscan.io/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${this.state.tetzelAddress}`;
    let logs = await fetch(url);
    let data = await logs.json();
    let newSins = data.result.map(this.processConfessEvent.bind(this));
    this.setState({recentSins: this.state.recentSins.concat(newSins)});
  }

  render() {

    return(
      <div>
        <Navbar />
        <Container className='sins-table below-navbar'>
          <Header
            as='h1'
            content='Table of Sins' 
            textAlign='center'
            className='dswallau sins-header' />
          <p className='sins-table'>These are the sins of those who have confessed through the TetzelCoin confessional. Every sin is taken directly from the Ethereum blockchain. The sins will remain recorded on the blockchain for as long as Ethereum exists.</p>
          <SinsTable 
            recentSins={ this.state.recentSins } 
            sinsPerPage={ 10 } />
          <div className='sins-table confess-btn-wrapper'>
            <Link to='/confess'>
              <Button 
                size='big' 
                primary 
                className='btn-cta sins-table confess-btn'>Confess Now</Button>
            </Link>
          </div>
        </Container>
      </div>
    )
  }

}