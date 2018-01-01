import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Header,
  Icon,
  Menu,
  Sidebar,
} from "semantic-ui-react";

import '../css/dswallau.css';
import '../css/navbar.css';

export default class Navbar extends Component {

  state = { visible: false };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    console.log(visible);

    const mobileMenu = (visible) => {
      if (!visible) return null;
      return (
        <div className='navbar mobile'>
          <div className='mobile navbar-link-wrapper'>
            <Link className='mobile navbar-link' name='home' to='/'>
              Home
            </Link>
          </div>
          <div className='mobile navbar-link-wrapper'>
            <Link className='mobile navbar-link' name='instructions' to='/tokens'>
              Tokens
            </Link>
          </div>
          <div className='mobile navbar-link-wrapper'>
            <Link className='mobile navbar-link' name='sins' to='/sins'>
              <Button primary size='big' className='btn-dark'>View Sins</Button>
            </Link>
          </div>
        </div>
      );
    }

    return(
      <div>
        <Menu borderless className='navbar'>
          <Link className='navbar-link' to='/'>
            <Menu.Item className='navbar-item' name='tetzelcoin' >
              <Header
                as='h1'
                content='TetzelCoin'
                textAlign='center'
                className='dswallau navbar-header'
              />
            </Menu.Item>
          </Link>

          <Menu.Menu position='right'>
            <Link className='navbar-link desktop' to='/'>
              <Menu.Item className='navbar-item' name='home' >
                Home
              </Menu.Item>
            </Link>
            <Link className='navbar-link desktop' to='/tokens'>
              <Menu.Item className='navbar-item' name='instructions' >
                Tokens
              </Menu.Item>
            </Link>
            <Link className='navbar-link desktop' to='/sins'>
              <Menu.Item className='navbar-item btn-dark' name='sins' >
                <Button primary size='big' className='btn-dark'>View Sins</Button>
              </Menu.Item>
            </Link>
            <Menu.Item
              className='navbar-link mobile hamburger'
              onClick={ this.toggleVisibility } >
              <Icon name={ visible ? 'close' : 'content' } />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        { /* Mobile menu - hide confessional screen and content when visible */ }
        { mobileMenu(visible) }
        { visible ? null : <div className='navbar confessional-screen'></div> }
        { visible ? null : this.props.children }
      </div>
    )
  }

}
