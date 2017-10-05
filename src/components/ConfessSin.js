import React, { Component } from 'react';
import {
  Container,
  Form,
  Header,
  Icon,
  TextArea,
} from 'semantic-ui-react';

import '../css/dswallau.css';

export default class ConfessSin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sinText: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({sinText: event.target.value});
  }

  render() {
    return(
      <Container>
        <Header
          as='h1'
          content='Confess Your Sin' 
          textAlign='center'
          className='dswallau confess-header' 
        />
        <p>Write down your sin in the box below. Your sin will be displayed in the Table of Sins. Bear in mind that Ethereum will charge you more for longer text.</p>
        <Form>
          <TextArea onChange={ this.handleChange } />
        </Form>
        <a onClick={ () => this.props.onNext(this.state.sinText) }>Next <Icon name='long arrow right'/></a>
      </Container>
    );
  }
}