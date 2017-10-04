import React, { Component } from 'react';
import {
  Container,
  Icon,
  // Header,
} from 'semantic-ui-react';

import ConfessSin from './components/ConfessSin';
import ValueSin from './components/ValueSin';
import PurchaseSin from './components/PurchaseSin';
import Forgiveness from './components/Forgiveness';

import './css/confess.css';

export default class Confess extends Component {

  render() {
    return(
      <Container>
        <a><Icon name='long arrow left' /> Exit Confession</a>
        <Forgiveness />
      </Container>
    );
  }

}