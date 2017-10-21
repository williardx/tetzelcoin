import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Message,
  TextArea,
} from 'semantic-ui-react';

import '../css/dswallau.css';

export default class ConfessSin extends Component {

  render() {
    const hideErrorMsg = this.props.errorMsg.length === 0;
    return(
      <div className='confess-sin-wrapper'>
        <Header
          as='h1'
          content='Confess Your Sin' 
          textAlign='center'
          className='dswallau confess-header gradient-text' 
        />
        <p className='confess'>Write down your sin in the box below. Your sin will be displayed in the Table of Sins. Bear in mind that Ethereum will charge you more for longer text.</p>
        <Message 
          color='red' 
          hidden={ hideErrorMsg } 
          className='confess-sin error-message'>
          { this.props.errorMsg }
        </Message>
        <Form>
          <TextArea
            className='confess' 
            value={ this.props.sinText } 
            onChange={ (event) => this.props.updateSinText(event.target.value) } />
        </Form>
        <a 
          className='arrow-link next-link'
          onClick={ () => this.props.onNext() }>
          Next <Icon name='long arrow right'/>
        </a>
      </div>
    );
  }
}