import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';

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
          <Route component={ NotFound } />
        </Switch>
      </main>
    );
  }
}
