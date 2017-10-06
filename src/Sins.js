import React, { Component } from 'react';
import { 
  Container,
  Header,
} from 'semantic-ui-react';
import SinsTable from './components/SinsTable';

import Tetzel from '../build/contracts/Tetzel.json';
import TetzelCrowdsale from '../build/contracts/TetzelCrowdsale.json';

import './css/dswallau.css';

export default class Sins extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tetzelInstance: null,
      tetzelCrowdsaleInstance: null,
      recentSins: [],
    };
  }

  async componentWillMount() {
    if (this.props.web3) {
      await this.instantiateContracts();
      await this.instantiateFilter();
    }
  }

    hexToAscii(h) {
      var hex  = h.toString();
      var str = '';
      for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
      }
      return str;
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
    const tetzelCrowdsale = contract(TetzelCrowdsale);

    tetzel.setProvider(this.props.web3.currentProvider)
    tetzelCrowdsale.setProvider(this.props.web3.currentProvider)

    //TODO: Is there any way to do this without making so many async calls?
    var tetzelInstance = await tetzel.deployed();
    var tetzelCrowdsaleInstance = await tetzelCrowdsale.deployed();

    this.setState({
      tetzelInstance: tetzelInstance,
      tetzelAddress: tetzelInstance.address,
    });
  }  

  async instantiateFilter() {
    
    var sinFilter = this.props.web3.eth.filter({
      address: this.state.tetzelInstance.address,
      fromBlock: 1,
      toBlock: 'latest'
    });

    sinFilter.watch(async (err, event) => {
      if (err !== null) {
        console.log("There was an error getting event logs");
      }

      var blockObj = await this._getBlockTimestamp(event.blockNumber);

      var logObj = {
        timestamp: blockObj.timestamp,
        sinner: "0x" + event.topics[1].replace(/^0x0+/, ""),
        sin: this.hexToAscii(event.data.replace("0x", "")),
        payment: this.props.web3.fromWei(parseInt(event.topics[3], 16), 'ether'),
      };

      this.setState({ recentSins: [...this.state.recentSins, logObj] });

    });

  } 

  render() {
    return(
      <Container>
        <Header
          as='h1'
          content='Table of Sins' 
          textAlign='center'
          className='dswallau instructions-header' />
        <SinsTable recentSins={ this.state.recentSins } />
      </Container>
    )
  }

}