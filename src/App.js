import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import HomeLaunch from './home-launch';
import Instructions from './Instructions';
import Confess from './Confess';
import Sins from './Sins';
import Tokens from './Tokens';
import NotFound from './NotFound';
import getWeb3 from './utils/getWeb3';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailchimp: {
        signupUrl: 'https://tetzelcoin.us16.list-manage.com/subscribe/post-json',
        u: 'b15551cd2bb3421b361f0f897',
        id: 'f7e39aeb69'
      },
      web3: null,
    }
  }

  async componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    try {
      var web3 = await getWeb3;
      this.setState({web3: web3.web3});
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return(
      <main>
        <Switch>
          <Route exact path="/" render={ () => <Home mailchimp={this.state.mailchimp} /> } />
          <Route exact path="/instructions" component={ Instructions } />
          <Route exact path="/home-launch" render={ () => <HomeLaunch mailchimp={this.state.mailchimp} /> } />
          <Route exact path="/confess" component={ () =>  <Confess web3={this.state.web3} /> } />
          <Route exact path="/sins" component={ () => <Sins web3={this.state.web3} /> } />
          <Route exact path="/tokens" component={ () => <Tokens web3={this.state.web3} /> } />
          <Route component={ NotFound } />
        </Switch>
      </main>
    );
  }
}
