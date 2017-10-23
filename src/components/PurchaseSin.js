import React, { Component } from 'react';
import {
  Button,
  Container,
  Grid,
  Form,
  Header,
  Image,
  Input,
  Loader,
  Message,
} from 'semantic-ui-react';

export default class PurchaseSin extends Component {

  render() {

    const txUrl = this.props.tx ? 'https://etherscan.io/tx/' + this.props.tx : '';
    const hideErrorMsg = this.props.errorMsg.length === 0;

    var submitButton = (pending) => {
      if (pending) return null;
      return (
        <Button
          disabled={ this.props.pending }
          type="submit"
          primary
          size='big'
          className='btn-cta submit-btn'
          onClick={() => this.props.onPurchase() }> Submit </Button>
      );
    }

    return(
      <div className='confess-contain'>
        <Header
          as='h1'
          content='Submit Payment'
          textAlign='center'
          className='dswallau confess-header gradient-text'
        />
        <Message 
          color='red' 
          hidden={ hideErrorMsg } 
          className='confess-sin error-message'>
          { this.props.errorMsg }
        </Message>
        <p className='confess'>Now that you've confessed, submit your transaction to purchase your SIN tokens and obtain forgiveness.</p>
        <p className='confess'>Your sin: { this.props.sinText }</p>
        <Grid className='bordered-form purchase-form'>
          <Grid.Row>
            <Grid.Column width={4} style={{ textAlign: 'center' }} className='payment-form-text payment-form-label'>
              Contract Address
            </Grid.Column>
            <Grid.Column className='payment-input-column recipient' width={12}>
              <Input
                className='confess payment-input recipient gray-out'
                fluid
                readOnly
                value={ this.props.tetzelAddress }/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4} className='payment-form-text payment-form-label'>
              Amount
            </Grid.Column>

            <Grid.Column className='payment-input-column' width={11} computer={11} tablet={11} mobile={10} >
              <Input
                readOnly={ this.props.pending }
                className='confess payment-input input-with-units'
                fluid
                type='number'
                min='0'
                onChange={ (event) => this.props.updateSinValue(event.target.value, 'ETH') }
                value={ this.props.sinValueETH } />
            </Grid.Column>
            <Grid.Column className='payment-form-text' floated='right' width={1} computer={1} tablet={1} mobile={2}>
              ETH
            </Grid.Column>

            </Grid.Row>
            <Grid.Row>
            <Grid.Column width={4} style={{ textAlign: 'center' }} className='payment-form-text payment-form-label'>
              SIN Received
            </Grid.Column>
            <Grid.Column width={11} computer={11} tablet={11} mobile={10} className='payment-input-column'>
                <Input
                  className='confess payment-input input-with-units gray-out'
                  fluid
                  value={ this.props.sinValueETH * this.props.sinRate }
                  readOnly />
            </Grid.Column>
            <Grid.Column className='payment-form-text' floated='right' width={1} computer={1} tablet={1} mobile={2}>
              SIN
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4} className='donation-img-wrapper'>
              <Image
                width={60}
                className='center-hack'
                src="/images/rip_medical_debt_tz_colors.png" />
            </Grid.Column>
            <Grid.Column width={4} computer={4} tablet={4} mobile={6} className='payment-form-text'>Your Donation to RIP Medical Debt</Grid.Column>
            <Grid.Column className='payment-input-column donation-column' width={7} computer={7} tablet={7} mobile={4}>
              <Input
                className='confess donation-field payment-input input-with-units gray-out'
                fluid
                value={ this.props.sinValueETH * 0.85 }
                readOnly />
            </Grid.Column>
            <Grid.Column className='payment-form-text' width={1} computer={1} tablet={1} mobile={2}>
              ETH
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div>
          <Loader inline='centered' active={ this.props.pending }>Transaction pending... this may take a few moments. <br /> <a href={ txUrl }>View your transaction on Etherscan.</a></Loader>
          { submitButton(this.props.pending) }
        </div>
      </div>
    );
  }

}
