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
  Input,
} from 'semantic-ui-react'
import CountdownTimer from './components/CountdownTimer';

import './css/dswallau.css';
import './css/home.css';


export default class Home extends Component {

  render() {
    let launchDate = Math.floor(new Date(2017, 9, 31, 12).getTime() / 1000);
    return (
      <div>
        <Segment
          textAlign='center'
          className='hero'
          vertical
          basic
        >
          <Container text>
            <Header
              as='h1'
              content='TetzelCoin'
              className='dswallau'
              style={{ fontSize: '4em', marginBottom: 0, marginTop: '1em' }}
            />
            <Header
              as='h2'
              content='A Token for Forgiveness'
              style={{ fontSize: '1.5em', fontWeight: 'normal', marginTop: '0em' }}
            />
            <Image
              centered
              size='medium'
              src='/images/TetzelCoin_Coin.png'
            />
            <Header
              as='h4'
              content='Sign up to receive updates about TetzelCoin and token sale '
              style={{ fontSize: '1.2em', fontWeight: 'normal' }}
            />
            <Input
              className='email-input'
              action={<Button primary size='big' className='btn-cta'>Sign Up</Button>}
              placeholder='your@email.com'
            />
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
                <Button primary size='big' className='btn-cta'>
                  Whitepaper
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  size='large'
                  src='/images/TetzelCoin_Confessional-Booth.png'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Header as='h3' style={{ fontSize: '2em' }}>How does it work?</Header>              
            </Grid.Row>
            <Grid.Row>
              <Image
                fluid
                style={{height: '100%'}}
                src='/images/TetzelCoin_How-It-Works.png'
              />
            </Grid.Row>
            <Grid.Row>
              <Header as='h4' style={{ fontSize: '1.5em' }}>Confession</Header>                            
            </Grid.Row>
            <Grid.Row>
              <Image
                fluid
                size='huge'
                style={{height: '100%'}}
                src='/images/TetzelCoin_MedicalDebt.png'
              />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h4' style={{ fontSize: '1.5em' }}>Forgiveness</Header>
                <p style={{ fontSize: '1.33em' }}>
                  TetzelCoin is a cryptocurrency designed to be a token for forgiveness. Since we cannot forgive and forget, users are able to define their sins in monetary terms and take appropriate action to correct their misdeeds. (Edit text later...)
                </p>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  src='/images/TetzelCoin_Forgiveness.png'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment className='dark-gray-background' style={{ padding: '8em 0em' }} vertical>
          <Container text style={{ textAlign: 'center' }}>
            <Header as='h3' className='dswallau' style={{ fontSize: '2em' }}>Confession Begins</Header>
            <p style={{ fontSize: '1.33em', marginBottom: '2em' }}>
              October 31, 2017, 12 PM PST
            </p>
            <CountdownTimer targetTime={launchDate} />
          </Container>
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

        <Segment style={{ padding: '8em 0em' }} vertical className='dark-gray-background'>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Header as='h3' style={{ fontSize: '2em' }}>Team</Header>            
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
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
