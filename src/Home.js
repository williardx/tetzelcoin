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
                  White Paper
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  className='center-hack'
                  size='large'
                  style={{  }}
                  src='/images/TetzelCoin_Confessional-Booth.png'
                />
                <Image
                  className='center-hack rise'
                  style={{ width: '100%', position: 'absolute', left: '0%', top: '0%', zIndex: '-1' }}
                  src='/images/TetzelCoin_RobotCenter-half.png'
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
                  className='center-hack wiggle'
                  style={{ width: '7.5%', position: 'absolute', left: '17%', top: '51.5%', zIndex: '1' }}
                  src='/images/TetzelCoin_Dollars.png'
                />
                <Image
                  className='center-hack'
                  fluid
                  style={{height: '100%'}}
                  src='/images/TetzelCoin_How-It-Works-NoMoney.png'
                />
              </Grid.Row>
              <Grid.Row only='mobile'>
                <Image
                  className='center-hack wiggle'
                  style={{ width: '7.5%', position: 'absolute', left: '19.5%', top: '48%', zIndex: '1' }}
                  src='/images/TetzelCoin_Dollars.png'
                />
                <Image
                  className='center-hack'
                  fluid
                  style={{height: '100%'}}
                  src='/images/TetzelCoin_How-It-Works-NoMoney-Mobile.png'
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
              <Grid.Row columns={2}>
                <Grid.Column floated='left'>
                  <Image
                    src='/images/TetzelCoin_Confessing.png'
                    style={{ width: '90%' }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <p style={{ fontSize: '1.33em' }}>
                    TetzelCoin allows us to correct our past wrongs by doing what's right. The first step to using TetzelCoin is to publicly confess a sin -- i.e., a harmful thing we have said or done -- and to pay an amount in proportion to the gravity of the sin. The confession and payment are done through the Pardoner, a special smart contract designed to pardon people of their sins. The Pardoner will register your confession on the public and permanent record of the Ethereum blockchain.
                  </p>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Header as='h4' style={{ fontSize: '2em', marginTop: '4%' }}>Forgive</Header>
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
                    Accepted purchase method: ETH
                  </p>
                </Grid.Column>
                <Grid.Column floated='right' width={6}>
                  <Image
                    rounded
                    size='large'
                    src='/images/TetzelCoin_PieChart.png'
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Button primary size='big' className='btn-cta center-hack'>
                  Token Sale Terms
                </Button>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

        <Segment vertical className='medical-debt-image'>
          <Image
            className='center-hack wiggle'
            style={{ width: '7.5%', position: 'absolute', left: '28%', top: '28%', zIndex: '1' }}
            src='/images/TetzelCoin_Dollars-Left.png'
          />
          <Image
            fluid
            className='center-hack'
            size='huge'
            style={{height: '100%'}}
            src='/images/TetzelCoin_MedicalDebt_NoMoney.png'
          />
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical className='dark-gray-background'>
          <Container>
            <Grid stackable>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                  <Header as='h3' style={{ fontSize: '2em' }}>Team</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                </Grid.Column>
                <Grid.Column width={6} padded='horizontally'>
                <Image
                  fluid
                  className='center-hack'
                  size='huge'
                  style={{width: '60%', borderRadius: '100%', boxShadow: '2px 1px 5px rgba(0, 0, 0, 0.1)' }}
                  src='/images/will-doenlen-headshot.jpg'
                />
                <Header as='h3' className='dswallau' style={{ fontSize: '2em', textAlign: 'center', paddingBottom: '0' }}>Will Doenlen</Header>
                <Header as='h3' style={{ fontSize: '1.5em', textAlign: 'center', paddingBottom: '0', marginTop: '10px' }}>Project Lead and Development</Header>
                <p style={{ textAlign: 'center', paddingLeft: '30px', paddingRight: '30px', fontSize: '1.15em' }} >Will Doenlen is an artist, engineer and investor 
                living in San Francisco. Will's art explores the existential absurdity of human systems 
                that provide us with symbolic value in our daily lives. You can view more of his projects 
                on his <a href="http://williardx.com">portfolio</a>. Will holds a BS from MIT.</p>
                </Grid.Column>
                <Grid.Column width={6} padded='horizontally'>
                <Image
                  fluid
                  className='center-hack'
                  size='huge'
                  style={{width: '60%', borderRadius: '100%', boxShadow: '2px 1px 5px rgba(0, 0, 0, 0.1)' }}
                  src='/images/leanne-luce-headshot.jpg'
                />
                <Header as='h3' className='dswallau' style={{ fontSize: '2em', textAlign: 'center', paddingBottom: '0' }}>Leanne Luce</Header>
                <Header as='h3' style={{ fontSize: '1.5em', textAlign: 'center', paddingBottom: '0', marginTop: '10px' }}>Designer</Header>
                <p style={{ textAlign: 'center', paddingLeft: '30px', paddingRight: '30px', fontSize: '1.15em' }}>Leanne is a designer, developer, 
                and fashion technologist based out of San Francisco.  You can visit her blog, <a href="https://thefashionrobot.com">the fashion robot</a> or view previous works in her <a href="https://leanneluce.com">portfolio</a>. 
                Leanne previously worked on wearable robotics at Harvard University and Otherlab. 
                She holds a BFA in Apparel Design from Rhode Island School of Design (RISD).</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>          
          </Container>
        </Segment>

        <Segment basic textAlign='center' style={{ padding: '8em 0em' }} vertical>
          <Container>
            <Header as='h3' style={{ fontSize: '2em' }}>Receive updates about TetzelCoin and the token sale</Header>                      
            <MailchimpEmailForm
              u={this.props.mailchimp.u}
              id={this.props.mailchimp.id}
              signupUrl={this.props.mailchimp.signupUrl} />
          </Container>
        </Segment>

        <Segment className='footer' basic vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <p style={{ fontSize: '1.2em', paddingBottom: '0' }}>Copyright &copy; TetzelCoin</p>
                  <p style={{ fontSize: '1.2em' }}><a href="/">Press Kit</a></p>
                </Grid.Column>
                <Grid.Column textAlign='center'>
                  <a className='icons-link' href="https://github.com/wdoenlen/tetzelcoin/">
                    <Image
                      className='center-hack icons'
                      src='/images/TetzelCoin_github.png'
                    />
                  </a>
                </Grid.Column>
                <Grid.Column textAlign='right'>
                  <p style={{ fontSize: '1.2em' }}><a href="mailto:team@tetzelcoin.com">team@tetzelcoin.com</a></p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}
