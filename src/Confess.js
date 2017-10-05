import React, { Component } from 'react';
import {
  Container,
  Icon,
  // Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ConfessSin from './components/ConfessSin';
import ValueSin from './components/ValueSin';
import PurchaseSin from './components/PurchaseSin';
import Forgiveness from './components/Forgiveness';

import './css/confess.css';

export default class Confess extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sinText: '',
      sinValue: 0,
    };
  }

  render() {
    return(
      <Container>
        <Link to='/'><Icon name='long arrow left' /> Exit Confession</Link>
        <ConfessSin onNext={ (txt) => this.setState({sinText: txt}) } />
        <ValueSin sinValue={ this.state.sinValue } onNext={ (val) => this.setState({sinValue: val}) } />
        <PurchaseSin sinValue={ this.state.sinValue } onPay={ () => {}} />
        <Forgiveness />
      </Container>
    );
  }

}