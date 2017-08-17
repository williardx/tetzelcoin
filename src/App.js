import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Confess from './Confess';
import Home from './Home';
import ConfessionalTest from './ConfessionalTest';

import './App.css';

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/confess" component={ Confess } />
      <Route path="/confessionaltest" component = { ConfessionalTest } />
    </Switch>
  </main>
);

export default App;
