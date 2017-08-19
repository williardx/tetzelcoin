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
import MailchimpEmailForm from './components/MailchimpEmailForm';

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
              content='Sign up to receive updates about TetzelCoin and the token sale'
              style={{ fontSize: '1.2em', fontWeight: 'normal' }}
            />
            <MailchimpEmailForm
              u={this.props.mailchimp.u}
              id={this.props.mailchimp.id}
              signupUrl={this.props.mailchimp.signupUrl}
            />
          </Container>
        </Segment>

        <Segment style={{ padding: '2% 8%' }} vertical>
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
                  className='center-hack'
                  size='large'
                  src='/images/TetzelCoin_Confessional-Booth.png'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '8% 8%' }} vertical>
          <Container>
            <Grid stackable verticalAlign='middle'>
              <Grid.Row>
                <Header as='h3' className='center-hack' style={{ fontSize: '2em', paddingBottom: '0' }}>How does it work?</Header>              
              </Grid.Row>
              <Grid.Row only='computer tablet'>
                <Image
                  className='center-hack'
                  fluid
                  style={{height: '100%'}}
                  src='/images/TetzelCoin_How-It-Works.png'
                />
              </Grid.Row>
              <Grid.Row only='mobile'>
                <Image
                  className='center-hack'
                  fluid
                  style={{height: '100%'}}
                  src='/images/TetzelCoin_How-It-Works-Mobile.png'
                />
              </Grid.Row>
              <Grid.Row>
                <Header as='h4' style={{ fontSize: '2em' }}>Confess</Header>                            
              </Grid.Row>
              <Grid.Row>
                <Segment className='how-it-works-steps'>
                  <p style={{ fontSize: '1.2em' }}>Confess your sin and pay whatever you believe your sin to be worth. The sin gets registered on the blockchain.</p>
                </Segment>
              </Grid.Row>
              <Grid.Row>
                <p style={{ fontSize: '1.33em' }}>
                  TetzelCoin allows us to correct our past wrongs by doing what's right. The first step to using TetzelCoin is to publicly confess a sin -- i.e., a harmful thing we have said or done -- and to pay an amount in proportion to the gravity of the sin. The confession and payment are done through the Pardoner, a special smart contract designed to pardon people of their sins. The Pardoner will register your confession on the public and permanent record of the Ethereum blockchain.
                </p>
              </Grid.Row>
              <Grid.Row>
                <Header as='h4' style={{ fontSize: '2em' }}>Forgive</Header>
              </Grid.Row>
              <Grid.Row>
                <Segment className='how-it-works-steps'>
                  <p style={{ fontSize: '1.2em' }}>You receive TetzelCoin as a token of forgiveness. The proceeds from your confession are used to forgive medical debt.</p>
                </Segment>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                   <p style={{ fontSize: '1.33em' }}>
                    TetzelCoin is fundamentally about forgiveness. Once you've confessed and paid an appropriate amount for your sin, the Pardoner will issue you TetzelCoin as a token of forgiveness. Once issued, you can use the token to further forgive or apologize to others by simply sending them TetzelCoin.
                  </p>
                  <p style={{ fontSize: '1.33em' }}>
                    The proceeds from TetzelCoin will be used to purchase and cancel medical debt. A particularly pernicious form of debt, medical debt is issued when a patient is unable to pay for their treatment. Medical debt can be purchased for pennies on the dollar, allowing your forgiveness to magnify tens of times over and help forgive others of their debts.
                  </p>
                </Grid.Column>
                <Grid.Column floated='right'>
                  <Image
                    src='/images/TetzelCoin_Forgiveness.png'
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

        <Segment className='dark-gray-background' style={{ padding: '8% 0em' }} vertical>
          <Container text style={{ textAlign: 'center' }}>
            <Header as='h3' className='dswallau' style={{ fontSize: '3em', paddingBottom: '0' }}>Confession Begins</Header>
            <p style={{ fontSize: '1.33em', marginBottom: '2em' }}>
              October 31, 2017, 12 PM PST
            </p>
            <CountdownTimer targetTime={launchDate} />
          </Container>
        </Segment>

        <Segment style={{ padding: '8% 8%' }} vertical>
          <Container>
            <Grid stackable verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as='h3' style={{ fontSize: '2em' }}>Token Sale</Header>
                  <p style={{ fontSize: '1.33em' }}>
                    The TetzelCoin token sale will begin on October 31st at 12PM PST (the 500th Anniversary of Reformation Day) and will end January 1st, 2018, 12 AM PST.
                  </p>
                  <p style={{ fontSize: '1.33em' }}>
                    The token sale is uncapped. Tokens will be issued at a rate of 500 SIN per ETH and will be available immediately upon confession. Only ether will be accepted as payment.
                  </p>
                  <p style={{ fontSize: '1.33em' }}>
                    85% of the tokens will be distributed to token buyers and 15% will be retained by the team.
                  </p>
                  <p style={{ fontSize: '1.33em' }}>
                    100% of the proceeds from the token sale will go to The Tetzel Fund, a 501(c)(3) non-profit that will provide medical debt relief in the United States.
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
              <Grid.Row>
                <Image
                  fluid
                  className='center-hack'
                  size='huge'
                  style={{height: '100%'}}
                  src='/images/TetzelCoin_MedicalDebt.png'
                />
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical className='dark-gray-background'>
          <Container>
            <Grid stackable verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <Header as='h3' style={{ fontSize: '2em' }}>Team</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column>
                </Grid.Column>
              </Grid.Row>
            </Grid>          
          </Container>
        </Segment>

        <Segment basic textAlign='center' style={{ padding: '8em 0em' }} vertical>
          <Container>
            <Header as='h3' style={{ fontSize: '2em' }}>Receive updates about TetzelCoin and the token sale</Header>                      

          </Container>
        </Segment>

        <Segment className='footer' basic vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <p>Copyright TetzelCoin</p>
                  <p>Press Kit</p>
                </Grid.Column>
                <Grid.Column textAlign='center'>
                  GitHub and other links
                </Grid.Column>
                <Grid.Column textAlign='right'>
                  <p>team@tetzelcoin.com</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}
