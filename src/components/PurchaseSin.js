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
        <p>Now that you've confessed, submit your transaction to purchase your SIN tokens and obtain forgiveness.</p>
        <p>Your sin: { this.props.sinText }</p>
        <Grid className='bordered-form'>
          <Grid.Row>
            <Grid.Column width={4}>
              Recipient
            </Grid.Column>
            <Grid.Column className='payment-input-column' width={12}>
              <Input
                className='payment-input'
                fluid 
                readOnly
                value={ this.props.tetzelAddress }/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              Amount
            </Grid.Column>
            <Grid.Column className='payment-input-column' width={11}>
              <Input
                className='payment-input input-with-units'
                fluid
                type='number'
                min='0'
                onChange={ (event) => this.props.updateSinValue(event.target.value) } 
                value={ this.props.sinValue } />
            </Grid.Column>
            <Grid.Column className='unit-name-column' width={1}>
              ETH
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              SIN Received
            </Grid.Column>
            <Grid.Column width={11} className='payment-input-column'>
                <Input
                  className='payment-input input-with-units'
                  fluid
                  value={ this.props.sinValue * this.props.sinRate } 
                  readOnly />
            </Grid.Column>
            <Grid.Column className='unit-name-column' width={1}>
              SIN
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image src="/images/rip_medical_debt_tz_colors.png" size='tiny' />
            </Grid.Column>
            <Grid.Column width={4}>Your Donation to RIP Medical Debt</Grid.Column>
            <Grid.Column className='payment-input-column' width={7}>
              <Input
                className='donation-field payment-input input-with-units'
                fluid
                value={ this.props.sinValue * 0.85 } 
                readOnly />
            </Grid.Column>
            <Grid.Column className='unit-name-column' width={1}>
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