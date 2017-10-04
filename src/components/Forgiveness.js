import React, { Component } from 'react';
import {
  Container,
  Header,
  Image,
} from 'semantic-ui-react';

export default class Forgiveness extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sinAmount: props.sinAmount || 0
    };
  }

  render() {
    return (
      <Container>
        <Header
          as='h1'
          content='You are Forgiven' 
          textAlign='center'
          className='dswallau confess-header' 
        />
        <Image 
          src="/images/TetzelCoin_Coin.png" 
          size='medium' 
          className='center-hack' />
        <p>You own { this.state.sinAmount } SIN</p>
      </Container>
    );
  }

}