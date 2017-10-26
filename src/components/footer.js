import React, { Component } from 'react'
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
  Visibility,
  Input,
} from 'semantic-ui-react';
import MailchimpEmailForm from './MailchimpEmailForm';

import '../css/dswallau.css';
import '../css/home.css';

export default class TetzelFooter extends Component {

  render() {

    let footerSocial = (alignment) => (
      <Grid.Column textAlign={alignment}>
        <a className='icons-link' href="https://github.com/williardx/tetzelcoin/">
          <Image
            className='center-hack icons social-icons'
            src='/images/TetzelCoin_github.png'
          />
        </a>
        <a className='icons-link' href="https://twitter.com/tetzelcoin/">
          <Image
            className='center-hack icons social-icons'
            src='/images/TetzelCoin_twitter.png'
          />
        </a>
      </Grid.Column>
    );

    let footerPressKit = (alignment) => (
      <Grid.Column textAlign={alignment}>
        <p className='footer-text footer-copyright'>Copyright &copy; TetzelCoin</p>
        <p className='footer-text'><a href="https://drive.google.com/open?id=0B1_FSb-uT5g-ZzYyNWdaWmFFUjA">Press Kit</a></p>
      </Grid.Column>
    );

    let footerEmail = (alignment) => (
      <Grid.Column textAlign={alignment}>
        <p className='footer-text footer-email'><a href="mailto:team@tetzelcoin.com">team@tetzelcoin.com</a></p>
      </Grid.Column>
    );

    return (
      <div>
        <Segment className='footer' basic vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid columns={3} stackable>
              <Grid.Row only='computer tablet'>
                { footerPressKit('left') }
                { footerSocial('center') }
                { footerEmail('right') }
              </Grid.Row>
              <Grid.Row only='mobile'>
                { footerSocial('center') }
                { footerEmail('center') }
                { footerPressKit('center') }
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}
