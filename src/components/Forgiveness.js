import React, { Component } from 'react';
import {
  Button,
  Container,
  Header,
  Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Forgiveness extends Component {

  render() {

    const txUrl = 'https://etherscan.io/tx/' + this.props.tx;    

    return (
      <div className='forgiveness-wrapper'>
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
        <p className='confess sin-ownership'>You own { this.props.tokenAmount } SIN</p>
        <p className='confess'>Congratulations, you are forgiven. Your transaction has completed and your SIN tokens are available. Your sin is now viewable in the Table of Sins. <a href={ txUrl }>View your transaction on Etherscan.</a></p>
        <div className='forgiveness-btns-wrapper'>
          <Link to='/sins'>
            <Button
              primary 
              size='big'
              className='btn-cta btn-forgiveness'>
              View Table of Sins
            </Button>
          </Link>
          <Link to='/confess'>
            <Button
              primary 
              size='big'
              className='btn-cta btn-forgiveness'>
              Confess Again
            </Button>
          </Link>
        </div>
      </div>
    );
  }

}