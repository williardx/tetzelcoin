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

import './css/dswallau.css';
import './css/instructions.css';

export default class Instructions extends Component {

  render() {
    return (
      <div className='instructions-wrapper'>
        <Navbar>
          <Container className='instructions-container'>
            <Header
              as='h1'
              content='Instructions' 
              textAlign='center'
              className='dswallau instructions-header' />
            <List ordered>
              <List.Item className='install-metamask-item'>
                <p>To confess, please install MetaMask. MetaMask is a Chrome extension that lets you use Ethereum from your browser.</p>
                <Grid columns={2} >
                  <Grid.Column width={5}>
                    <Image
                      size='tiny'
                      className='center-hack'
                      src="/images/metamask.png" />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <Grid.Row className='get-metamask-row'>
                      <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
                        <Button className='get-metamask-button'>Get Metamask Chrome Extension</Button>
                      </a>
                    </Grid.Row>
                    <Grid.Row>
                      <a href="https://metamask.io/" className='learn-more'>Learn More</a>
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
              </List.Item>
              <List.Item>
                <p>Follow the instructions on MetaMask's website to create an account and send Ether to it to fund it. If you don't have any Ether we recommend using Coinbase for buying Ether.</p>
              </List.Item>
              <List.Item>
                <p>Think of a sin you would like to confess and how much it's worth. The amount of SIN tokens you receive is directly proportional to the amount of Ether you pay. You can designate another account as the recipient of your SIN tokens.</p>
              </List.Item>
              <List.Item>
                <p>After you submit your confession you will be prompted to pay for your sin through MetaMask. The correct address for payment will already be filled out for you.</p>
              </List.Item>
            </List>
            <div className='confess-button-wrapper'>
              <Link to="/confess">
                <Button primary size='big' className='btn-cta'>Confess</Button>
              </Link>
            </div>
          </Container>
        </Navbar>
      </div>
    );
  }

}