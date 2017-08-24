import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header } from 'semantic-ui-react';

import './css/notfound.css';
import './css/dswallau.css';

export default class NotFound extends Component {
  render() {
    return(
      <Container className='notfound-container' textAlign='center'>
        <Header
          as='h1'
          content='Not Found' 
          className='dswallau notfound-header' />
        <p className='notfound-text'>
          The page you are looking for does not exist.
        </p>
        <Link to='/'>
          <Button primary size='big' className='btn-cta'>
            Return Home
          </Button> 
        </Link>
      </Container>
    );
  }
}
