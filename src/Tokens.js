import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  List,
} from 'semantic-ui-react';
import Navbar from './components/Navbar';
import TetzelFooter from './components/footer';

import './css/dswallau.css';
import './css/tokens.css';

export default class Tokens extends Component {

  render() {
    return (
      <div>
        <Navbar>
          <Container className='tokens-wrapper tokens-container'>
            <Header
              as='h1'
              content='Tokens'
              textAlign='center'
              className='dswallau instructions-header' />
            <div>
              <p className='text-center'>How to load your SIN Tokens into MyEtherWallet</p>
              <Image
                className='center-hack'
                size='medium'
                src='/images/TetzelCoin_Coin.png'
              />
            </div>
            <List ordered>
              <List.Item>
                <p>Visit <a href="https://myetherwallet.com">MyEtherWallet</a>, go to your "View Wallet Info" page, and load your wallet.</p>
              </List.Item>
              <List.Item>
                <p>Select "Add Custom Token".</p>
              </List.Item>
              <List.Item>
                <p>Enter the contract address:<span className='courier'>  0xCONTRACTADDRESSHERE</span> <br />
                  And the number of decimals:<span className='courier'>  8</span>
                </p>
              </List.Item>
              <List.Item>
                <p>If it does not automatically appear, add the token symbol (SIN).</p>
              </List.Item>
              <List.Item>
                <p>Click save.</p>
              </List.Item>
            </List>
            <div className='confess-button-wrapper'>
              <Link to="/confess">
                <Button primary size='big' className='btn-dark'>Confess</Button>
              </Link>
            </div>
          </Container>
        </Navbar>
        <TetzelFooter></TetzelFooter>
      </div>
    );
  }

}
