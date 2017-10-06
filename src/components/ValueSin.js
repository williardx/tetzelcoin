import React, { Component } from 'react';
import {
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Input,
} from 'semantic-ui-react';

export default class ValueSin extends Component {

  render() {
    console.log(this.state);
    return (
      <Container className='confess-container'>
        <Header
          as='h1'
          content='Value Your Sin' 
          textAlign='center'
          className='dswallau confess-header gradient-text' 
        />
        <p>How do you value a sin? To help you figure out how much your sin is worth, we're going to ask you to value a few other sins first. You can then use those numbers to value your own. You can skip this part if you already know how much your sin is worth.</p>
        <Grid padded columns={2} className='bordered-form value-form'>
          <Grid.Row>
            <Grid.Column width={11}>
              <label>Jane told her best friend a white lie. She should pay...?</label>
            </Grid.Column>
            <Grid.Column width={4} floated='right'>
              <Input
                fluid
                value={ this.props.testSinValues[0] } 
                icon='dollar' 
                iconPosition='left'
                type='number'
                onChange={ (e) => this.props.updateTestSinValues(0, e.target.value) } />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <label>Johnny cheated on his taxes. He should pay...?</label>
            </Grid.Column>
            <Grid.Column width={4} floated='right'>
              <Input
                fluid
                value={ this.props.testSinValues[1] } 
                icon='dollar' 
                iconPosition='left' 
                type='number'
                onChange={ (e) => this.props.updateTestSinValues(1, e.target.value) } />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <label>Joe isn't living his best life. He should pay...?</label>
            </Grid.Column>
            <Grid.Column width={4} floated='right'>
              <Input 
                fluid
                value={ this.props.testSinValues[2] }
                icon='dollar' 
                iconPosition='left' 
                type='number'
                onChange={ (e) => this.props.updateTestSinValues(2, e.target.value) } />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={11}>
              <label>Your sin: "{ this.props.sinText }" You should pay...?</label>
            </Grid.Column>
            <Grid.Column width={4} floated='right'>
              <Input
                fluid
                value={ this.props.sinValue }
                icon='dollar' 
                iconPosition='left'
                type='number' 
                onChange={ (e) => this.props.updateSinValue(e.target.value) } />
            </Grid.Column>
          </Grid.Row>        
        </Grid>
        <a className='arrow-link next-link' onClick={ () => this.props.onNext() }>Next <Icon name='long arrow right'/></a>
      </Container>
    )
  }
}