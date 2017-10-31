import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Navbar from './components/Navbar';
import TetzelFooter from './components/footer';
import './css/instructions.css';
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  List,
} from 'semantic-ui-react';

var Wufoo = require('react-wufoo-embed');


export default class TaxForm extends Component {

   render() {

     return(
        <div>
          <Navbar />
            <Container id="forms-page" className='instructions-container'>
              <Header
                as='h1'
                content='Taxes'
                textAlign='center'
                className='dswallau instructions-header' />
                <br />
              <Wufoo userName="leanneluce" formHash="q1592l9a01cbpvb" />
            </Container>
          <TetzelFooter />
        </div>

     );
   }
}
