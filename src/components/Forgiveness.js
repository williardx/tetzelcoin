import React, { Component } from 'react';
import {
  Container,
  Header,
  Image,
} from 'semantic-ui-react';

export default class Forgiveness extends Component {

  render() {

    const txComplete = this.props.tx !== null;
    let txUrl;
    if (txComplete) {
      txUrl = 'https://etherscan.io/tx/' + this.props.tx;    
    }

    return (
      <Container className='confess-container'>
        <Header
          as='h1'
          content={ "You Are Forgiven" }
          textAlign='center'
          className='dswallau confess-header gradient-text' 
        />
        <Image 
          src="/images/TetzelCoin_Coin.png" 
          size='medium' 
          className='center-hack' />
        <p>You own { this.props.tokenAmount } SIN</p>
        <p>Once your transaction completes your SIN tokens will be available and you will be forgiven. <a href={ txUrl }>View your transaction on Etherscan.</a></p>
      </Container>
    );
  }

}