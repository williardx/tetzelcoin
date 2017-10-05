import React, { Component } from 'react';
import {
  Container,
  Form,
  Header,
  Icon,
  Input,
} from 'semantic-ui-react';

export default class ValueSin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sinValue: null,
    };
  }

  handleChange(event) {
    this.setState({sinValue: event.target.value});
  }

  render() {
    console.log(this.state);
    return (
      <Container>
        <Header
          as='h1'
          content='Value Your Sin' 
          textAlign='center'
          className='dswallau confess-header gradient-text' 
        />
        <p>How do you value a sin? To help you figure out how much your sin is worth, we're going to ask you to value a few other sins first. You can then use those numbers to value your own. Use whatever currency you feel comfortable with, though you'll need to eventually convert to ether. You can skip this part if you already know how much your sin is worth.</p>
        <Form>
          <Form.Field inline>
            <label>Johnny shot and killed a man. He should pay...?</label>
            <Input
              value={ this.props.testSinValues[0] } 
              icon='dollar' 
              iconPosition='left'
              type='number'
              onChange={ (e) => this.props.updateTestSinValues(0, e.target.value) } />
          </Form.Field>
          <Form.Field inline>
            <label>Jane told her best friend a white lie. She should pay...?</label>
            <Input
              value={ this.props.testSinValues[1] } 
              icon='dollar' 
              iconPosition='left' 
              type='number'
              onChange={ (e) => this.props.updateTestSinValues(1, e.target.value) } />
          </Form.Field>
          <Form.Field inline>
            <label>Foster stole 10 loaves of bread from the grocery store.  He should pay...?</label>
            <Input 
              value={ this.props.testSinValues[2] }
              icon='dollar' 
              iconPosition='left' 
              type='number'
              onChange={ (e) => this.props.updateTestSinValues(2, e.target.value) } />
          </Form.Field>
          <Form.Field inline>
            <label>Your sin: "{ this.props.sinText }" You should pay...?</label>
          <Input
              icon='dollar' 
              iconPosition='left'
              type='number' 
              onChange={ this.handleChange.bind(this) } />
          </Form.Field>
        </Form>
        <a onClick={ () => this.props.onNext() }>Next <Icon name='long arrow right'/></a>
      </Container>
    )
  }
}