import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  Header,
  Image,
  Input,
  Grid,
} from 'semantic-ui-react';

export default class PurchaseSin extends Component {

  render() {
    return(
      <Container className='confess-container'>
        <Header
          as='h1'
          content='Submit Payment' 
          textAlign='center'
          className='dswallau confess-header gradient-text' 
        />
        <p className='confess'>Now that you've confessed, submit your transaction to purchase your SIN tokens and obtain forgiveness.</p>
        <p className='confess'>Your sin: { this.props.sinText }</p>
        <Grid className='bordered-form purchase-form'>
          <Grid.Row>
            <Grid.Column width={4} className='payment-form-text payment-form-label'>
              Recipient
            </Grid.Column>
            <Grid.Column className='payment-input-column recipient' width={12}>
              <Input
                className='confess payment-input recipient'
                fluid 
                readOnly
                value={ this.props.tetzelAddress }/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4} className='payment-form-text payment-form-label'>
              Amount
            </Grid.Column>
            <Grid.Column className='payment-input-column' width={11}>
              <Input
                className='confess payment-input input-with-units'
                fluid
                type='number'
                min='0'
                onChange={ (event) => this.props.updateSinValue(event.target.value, 'ETH') } 
                value={ this.props.sinValueETH } />
            </Grid.Column>
            <Grid.Column className='payment-form-text' width={1}>
              ETH
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4} className='payment-form-text payment-form-label'>
              SIN Received
            </Grid.Column>
            <Grid.Column width={11} className='payment-input-column'>
                <Input
                  className='confess payment-input input-with-units'
                  fluid
                  value={ this.props.sinValueETH * this.props.sinRate } 
                  readOnly />
            </Grid.Column>
            <Grid.Column className='payment-form-text' width={1}>
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
            <Grid.Column width={4} className='payment-form-text'>Your Donation to RIP Medical Debt</Grid.Column>
            <Grid.Column className='payment-input-column donation-column' width={7}>
              <Input
                className='confess donation-field payment-input input-with-units'
                fluid
                value={ this.props.sinValueETH * 0.85 } 
                readOnly />
            </Grid.Column>
            <Grid.Column className='payment-form-text' width={1}>
              ETH
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button
          type="submit" 
          primary 
          size='big' 
          className='btn-cta submit-btn' 
          onClick={() => this.props.onPurchase() }> Submit </Button>
      </Container>
    );
  }

}