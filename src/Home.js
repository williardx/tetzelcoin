import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'
import CountdownTimer from './components/CountdownTimer';

import './css/dswallau.css';
import './css/home.css';


export default class Home extends Component {

  render() {

    return (
      <div>
        <Segment
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em' }}
          vertical
        >
          <Container text>
            <Header
              as='h1'
              content='TetzelCoin'
              inverted
              className='dswallau'
              style={{ fontSize: '4em', marginBottom: 0, marginTop: '3em' }}
            />
            <Header
              as='h2'
              content='A token for forgiveness'
              inverted
              style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
            <Button primary size='huge' className='btn-cta'>
              Whitepaper
            </Button>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>What is TetzelCoin?</Header>
                <p style={{ fontSize: '1.33em' }}>
                  TetzelCoin is a cryptocurrency designed to be a token for forgiveness. Since we cannot forgive and forget, users are able to define their sins in monetary terms and take appropriate action to correct their misdeeds.
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  bordered
                  rounded
                  size='large'
                  src='/assets/images/wireframe/white-image.png'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment className='confession-countdown' style={{ padding: '8em 0em' }} vertical>
          <Container text style={{ textAlign: 'center' }}>
            <Header as='h3' className='dswallau' style={{ fontSize: '2em' }}>Confession Begins</Header>
            <p style={{ fontSize: '1.33em', marginBottom: '2em' }}>
              October 31, 2017, 12 PM PST
            </p>
            <CountdownTimer />
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>How does it work?</Header>
                <p style={{ fontSize: '1.33em' }}>
                  TODO: How it works description
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  bordered
                  rounded
                  size='large'
                  src='/assets/images/wireframe/white-image.png'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>Token Sale</Header>
                <p style={{ fontSize: '1.33em' }}>
                  The TetzelCoin token sale will begin on October 31st at 12PM PST (the 500th Anniversary of Reformation Day) and will end January 1st, 2018, 12 AM PST.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                  The token sale is uncapped and there is an unlimited supply of tokens.  Tokens will be available immediately upon confession. Only ether will be accepted as payment.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                  90% of the proceeds from the token sale will be donated directly to RIP Medical Debt. The remaining 10% will go towards covering operating costs and compensating the team.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                  View token sale terms here.
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  bordered
                  rounded
                  size='large'
                  src='/assets/images/wireframe/white-image.png'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided stackable>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Header as='h4'>Footer Header</Header>
                  <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}
