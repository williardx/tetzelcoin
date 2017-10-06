import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  Header,
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
        <Grid celled>
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
                className='payment-input'
                fluid
                type='number'
                min='0'
                onChange={ (event) => this.props.updateSinValue(event.target.value) } 
                value={ this.props.sinValue } />
            </Grid.Column>
            <Grid.Column className='payment-input-column' width={1}>
              ETH
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              Amount SIN Tokens to Receive
            </Grid.Column>
            <Grid.Column width={11} className='payment-input-column'>
                <Input
                  className='payment-input'
                  fluid
                  value={ this.props.sinValue * this.props.sinRate } 
                  readOnly />
            </Grid.Column>
            <Grid.Column className='payment-input-column' width={1}>
              SIN
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>Your Donation to RIP Medical Debt</Grid.Column>
            <Grid.Column width={4}>Your Donation to RIP Medical Debt</Grid.Column>
            <Grid.Column className='payment-input-column' width={7}>
              <Input
                className='payment-input'
                fluid
                value={ this.props.sinValue * 0.85 } 
                readOnly />
            </Grid.Column>
            <Grid.Column className='payment-input-column' width={1}>
              ETH
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button 
          type="submit" 
          primary 
          size='big' 
          className='btn-cta' 
          onClick={() => this.props.onPurchase() }> Submit </Button>
      </Container>
    );
  }

}