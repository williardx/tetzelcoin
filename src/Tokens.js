import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  List,
  Message,
  Table,
} from 'semantic-ui-react';
import Navbar from './components/Navbar';
import TetzelFooter from './components/footer';

import TetzelCoin from '../build/contracts/TetzelCoin.json';

import './css/dswallau.css';
import './css/tokens.css';

export default class Tokens extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      tetzelCoinInstance: null,
      tetzelCoinAddress: 'Loading...',
    }
  }

  async componentWillMount() {
    try {
      await this.instantiateContracts();
    } catch(e) {
      this.setState({errorMsg: 'There was an error loading the SIN token contract address'});
    }
  }

  async instantiateContracts() {

    const contract = require('truffle-contract');
    const tetzelCoin = contract(TetzelCoin);

    tetzelCoin.setProvider(this.props.web3.currentProvider);
    const tetzelCoinInstance = await tetzelCoin.deployed();

    this.setState({
      tetzelCoinInstance: tetzelCoinInstance,
      tetzelCoinAddress: tetzelCoinInstance.address,
    });
  }


  render() {
    const hideErrorMsg = this.state.errorMsg.length === 0;
    return (
      <div>
        <Navbar>
          <Container className='tokens-wrapper tokens-container'>
            <Header
              as='h1'
              content='SIN Tokens'
              textAlign='center'
              className='dswallau instructions-header' />
           <Message
           color='red'
           hidden={ hideErrorMsg }
           className='confess-sin error-message'>
           { this.state.errorMsg }
           </Message>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    SIN Token Address
                  </Table.Cell>
                  <Table.Cell className='tokens-address'>
                    <span className='courier'>{ this.state.tetzelCoinAddress }</span>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Symbol
                  </Table.Cell>
                  <Table.Cell>
                    SIN
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Decimals
                  </Table.Cell>
                  <Table.Cell>
                    18
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <div className='tokens-instructions'>
              <Header
                as='h2'
                textAlign='center'
                content='How to view your SIN tokens in MetaMask' >
                <a href="https://support.metamask.io/kb/article/4-managing-tokens">
                  How to view your SIN tokens in MetaMask
                </a>
              </Header>
              <Header
                as='h2'
                textAlign='center'>
                <a href="https://myetherwallet.github.io/knowledge-base/send/adding-new-token-and-sending-custom-tokens.html">
                  How to view your SIN tokens in MyEtherWallet
                </a>
              </Header>
            </div>
          </Container>
        </Navbar>
        <TetzelFooter></TetzelFooter>
      </div>
    );
  }

}
