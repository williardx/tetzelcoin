import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Confess from './Confess';
import Home from './Home';
import ConfessionalTest from './ConfessionalTest';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailchimp: {
        signupUrl: 'https://tetzelcoin.us16.list-manage.com/subscribe/post-json',
        u: 'b15551cd2bb3421b361f0f897',
        id: 'f7e39aeb69'
      }
    }
  }

  render() {
    return(
      <main>
        <Switch>
          <Route exact path="/" render={ () => <Home mailchimp={this.state.mailchimp} /> } />
          <Route path="/confess" component={ Confess } />
          <Route path="/confessionaltest" component = { ConfessionalTest } />
        </Switch>
      </main>
    );
  }
}
