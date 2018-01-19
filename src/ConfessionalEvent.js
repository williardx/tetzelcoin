import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  Grid,
  Image,
} from 'semantic-ui-react';
import Navbar from './components/Navbar';
import TetzelFooter from './components/footer';

import './css/dswallau.css';
import './css/event.css';

export default class ConfessionalEvent extends Component {

  render() {
    return (
      <div>
        <Navbar>
          <Container className='event-container'>
            <Header
              as='h1'
              content='Live Confessional Event'
              textAlign='center'
              className='dswallau instructions-header' />
            <p className='event-description'>
              On November 8, 2017 we held an in-person confessional event where participants could confess their sins to the blockchain in person. An interactive, bot-led service was held each hour and was accompanied by renowned musician Joshua Penman on the organ. The event was held at the <a href='http://www.conventartssf.com/'>Convent Arts Collective</a> in San Francisco.
            </p>
            <Grid stackable doubling columns={3}>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_1.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_2.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_15.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_4.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_5.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_6.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_8.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_10.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_11.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_12.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_13.jpg' />
                </Grid.Column>
                <Grid.Column>
                  <Image className='event-image' src='/images/event_14.jpg' />
                </Grid.Column>
            </Grid>
          </Container>
        </Navbar>
        <TetzelFooter></TetzelFooter>
      </div>
    );
  }

}
