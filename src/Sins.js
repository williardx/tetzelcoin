import React, { Component } from 'react';
import {
  Button,
  Container,
  Header,
  Loader,
  Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SinsTable from './components/SinsTable';
import Navbar from './components/Navbar';

import Tetzel from '../build/contracts/Tetzel.json';
import TetzelCrowdsale from '../build/contracts/TetzelCrowdsale.json';
import TetzelFooter from './components/footer';

import './css/dswallau.css';
import './css/sinstable.css';

export default class Sins extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tetzelAddress: null,
      tetzelInstance: null,
      recentSins: null,
      errorMsg: '',
    };
  }

  async componentWillMount() {
    if (this.props.web3) {
      try {
        await this.instantiateContracts();
        // TODO: Figure out why filter isn't working with Metamask and testnet.
        // For now we're pulling sins from Etherscan instead when we're
        // on testnet.
        if (this.props.web3.version.network === '1') { // mainnet
          await this.getSinsFromEtherscan();
        } else {
          await this.getSinsFromTestRPC();
        }
      } catch(e) {
        this.setState({errorMsg: e.message});
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

    const data = event.data.replace(/^0x/, '');
    const chunks = data.match(/.{1,64}/g);
    const payment = parseInt(chunks[0], 16);
    const sinHex = chunks.splice(3, chunks.length).join('');
    const sinText = this.props.web3.toUtf8(sinHex);

    return {
      timestamp: parseInt(event.timeStamp, 16),
      sinner: "0x" + event.topics[1].replace(/^0x0+/, ""),
      recipient: "0x" + event.topics[2].replace(/^0x0+/, ""),
      sin: sinText,
      payment: this.props.web3.fromWei(payment, 'ether'),
    };
  }

  async getSinsFromEtherscan(fromBlock, toBlock) {
    if (typeof toBlock === 'undefined') toBlock = 'latest';
    if (typeof fromBlock === 'undefined') fromBlock = 1800000;
    let url = `https://etherscan.io/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${this.state.tetzelAddress}`;
    let logs = await fetch(url);
    let data = await logs.json();
    let newSins = data.result.map(this.processConfessEvent.bind(this));
    if (this.state.recentSins !== null) {
      this.setState({recentSins: this.state.recentSins.concat(newSins)});
    } else {
      this.setState({recentSins: newSins});
    }
  }

  render() {

    var showSinsTable = (sinsLoaded) => {
      if (sinsLoaded) {
        return (
          <div>
            <SinsTable
              recentSins={ this.state.recentSins }
              sinsPerPage={ 10 } />
            <div className='sins-table confess-btn-wrapper'>
              <Link to='/instructions'>
                <Button primary size='big' className='btn-dark'>Confess Now</Button>
              </Link>
            </div>
          </div>
        );
      } else {
        return null;
      }
    }

    const sinsLoaded = this.state.recentSins !== null;
    const hideErrorMsg = this.state.errorMsg.length === 0;

    return(
      <div>
        <Navbar>
          <div className='sins-table-outer-wrapper'>
            <Container className='sins-table below-navbar'>
              <Header
                as='h1'
                content='Table of Sins'
                textAlign='center'
                className='dswallau sins-header' />
           <Message
           color='red'
           hidden={ hideErrorMsg }
           className='confess-sin error-message'>
           { this.state.errorMsg }
           </Message>
              <p className='sins-table'>These are the sins of those who have confessed through the TetzelCoin confessional. Every sin is taken directly from the Ethereum blockchain. The sins will remain recorded on the blockchain for as long as Ethereum exists.</p>
              <Loader active={ !sinsLoaded }>Loading...</Loader>
              { showSinsTable(sinsLoaded) }
            </Container>
          </div>
        </Navbar>
        <TetzelFooter />
      </div>
    )
  }

}
