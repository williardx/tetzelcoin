import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Confess from './Confess';
import Home from './Home';

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/confess" component={ Confess } />
    </Switch>
  </main>
);

export default App;
