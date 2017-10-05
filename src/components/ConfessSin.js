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

  render() {
    return(
      <Container className='confess-container'>
        <Header
          as='h1'
          content='Confess Your Sin' 
          textAlign='center'
          className='dswallau confess-header gradient-text' 
        />
        <p>Write down your sin in the box below. Your sin will be displayed in the Table of Sins. Bear in mind that Ethereum will charge you more for longer text.</p>
        <Form>
          <TextArea value={ this.props.sinText } onChange={ (event) => this.props.updateSinText(event.target.value) } />
        </Form>
        <a onClick={ () => this.props.onNext() }>Next <Icon name='long arrow right'/></a>
      </Container>
    );
  }
}