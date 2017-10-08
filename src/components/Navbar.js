import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Menu,
} from "semantic-ui-react";

import '../css/dswallau.css';
import '../css/navbar.css';

export default class Navbar extends Component {

  render() {
    return(
      <div>
        <Menu borderless className='navbar'>
          <Link className='navbar-link' to='/'>
            <Menu.Item name='tetzelcoin' >
              <Header
                as='h1'
                content='TetzelCoin'
                textAlign='center'
                className='dswallau navbar-header'
              />
            </Menu.Item>
          </Link>

          <Menu.Menu position='right'>
            <Link className='navbar-link' to='/'>
              <Menu.Item name='home' >
                Home
              </Menu.Item>
            </Link>
            <Link className='navbar-link' to='/confess'>
              <Menu.Item name='confess' >
                Confess
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </Menu>
        <div className='navbar confessional-screen'></div>
      </div>
    )
  }

}