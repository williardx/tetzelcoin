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
import EventPopup from './components/EventPopup';

import './css/dswallau.css';
import './css/home.css';

export default class Home extends Component {

  state = { popupVisible: false };

  render() {

    const launchDate = Math.floor(new Date(2017, 9, 31, 12).getTime() / 1000);
    const eventPopup = this.state.popupVisible ? <EventPopup togglePopupVisibility={ () => this.setState({popupVisible: false}) } /> : null;

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
            <Visibility onBottomPassed={ () => this.setState({popupVisible: true}) }>
              <Header
                as='h2'
                content='A Token for Forgiveness'
                style={{ fontSize: '1.5em', fontWeight: 'normal', marginTop: '0em' }}
              />
            </Visibility>
            <Image
              centered
              size='medium'
              src='/images/TetzelCoin_Coin.png'
            />
            <Header
              as='h4'
              content='Sign up to receive updates about TetzelCoin and the SIN token sale'
              style={{ fontSize: '1.2em', fontWeight: 'normal' }}
            />
            <MailchimpEmailForm
              u={this.props.mailchimp.u}
              id={this.props.mailchimp.id}
              signupUrl={this.props.mailchimp.signupUrl}
            />

          { eventPopup }

          </Container>
        </Segment>

        <Segment style={{ padding: '2% 8%' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>What is TetzelCoin?</Header>
                <p style={{ fontSize: '1.33em' }}>
                  TetzelCoin is a blockchain-based app that forgives users of their sins. Users confess their sins and pay an amount of Ether they believe their sin is worth. In return, they receive forgiveness in the form of SIN tokens. 85% of the proceeds go to medical debt forgiveness.
                </p>
                <a href="https://drive.google.com/open?id=0B7t2SoXRiUoXVERSaV9aRnR3VGc">
                  <Button primary size='big' className='btn-cta'>
                    White Paper
                  </Button>
                </a>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Image
                  className='center-hack'
                  size='large'
                  src='/images/TetzelCoin_Confessional-Booth.png'
                />
                <Image
                  className='center-hack'
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
                  className='center-hack'
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
                  className='center-hack'
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
                <Header as='h4' style={{ fontSize: '2em', marginTop: '20px', marginBottom: '20px' }}>Confess</Header>
              </Grid.Row>
              <Grid.Row>
                <Segment className='how-it-works-steps' style={{ marginBottom: '40px' }} >
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
                  <p style={{ fontSize: '1.33em', marginBottom: '40px' }}>
                    TetzelCoin allows us to correct our past wrongs by doing what's right. The first step to using TetzelCoin is to publicly confess a sin -- i.e., a harmful thing we have said or done -- and to pay an amount in proportion to the gravity of the sin. The confession and payment are done through a special Ethereum smart contract designed to pardon people of their sins. The smart contract will register your confession on the public and permanent record of the Ethereum blockchain.
                  </p>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Header as='h4' style={{ fontSize: '2em', marginTop: '4%', marginBottom: '20px' }}>Forgive</Header>
              </Grid.Row>
              <Grid.Row>
                <Segment className='how-it-works-steps' style={{ marginBottom: '40px' }} >
                  <p style={{ fontSize: '1.2em' }}>You receive SIN tokens as a token of forgiveness. 85% of the proceeds from your confession are used to forgive medical debt.</p>
                </Segment>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                   <p style={{ fontSize: '1.33em' }}>
                    TetzelCoin is fundamentally about forgiveness. Once you've confessed and paid an appropriate amount for your sin, you will receive SIN tokens showing you have been forgiven.
                  </p>
                  <p style={{ fontSize: '1.33em' }}>
                    85% of the proceeds from TetzelCoin will be donated to <a href="https://www.ripmedicaldebt.org/">RIP Medical Debt</a>, a New York-based non-profit that forgives medical debt in the United States. A particularly pernicious form of debt, medical debt is issued when a patient is unable to pay for their treatment. Medical debt can be purchased for pennies on the dollar, allowing your forgiveness to magnify tens of times over and help forgive others of their debts.
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
                  <Header as='h3' style={{ fontSize: '2em' }}>SIN Token Sale</Header>
                  <p style={{ fontSize: '1.33em' }}>
                    Confession and the SIN token sale will begin on October 31st at 12PM PST (the 500th Anniversary of <a href="https://en.wikipedia.org/wiki/Reformation_Day">Reformation Day</a>) and will end January 1st, 2018, 12 AM PST.
                  </p>
                  <p style={{ fontSize: '1.33em' }}>
                    The token sale is uncapped. Tokens will be issued at a rate of 500 SIN per ETH and will be available immediately upon confession. Only Ether will be accepted as payment. SIN tokens are ERC20-compatible.
                  </p>
                  <p style={{ fontSize: '1.33em' }}>
                    85% of the proceeds from the token sale will be donated directly to <a href="https://www.ripmedicaldebt.org/">RIP Medical Debt</a>. The remaining 15% of Ether will go to the team as compensation and to cover costs.
                  </p>
                  <p style={{ fontSize: '1.33em' }}>
                    At the conclusion of the sale, team members will have the option to collectively purchase up to 15% of the total supply of SIN tokens at a discount.
                  </p>
                  <p style={{ fontSize: '1.33em' }}>
                    <span className='home important-note'>Important Note</span>: SIN tokens have no value and we have no plans to try to make them valuable. This is a conceptual art piece. Confessing and buying SIN tokens is how you participate in the art.
                  </p>
                  <p style={{ fontSize: '1.33em' }}>
                    Token sale terms and conditions coming soon.
                  </p>
                </Grid.Column>
                <Grid.Column floated='right' width={6}>
                  <Image
                    rounded
                    size='large'
                    src='/images/TetzelCoin_PieChart2.png'
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
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
                  <Grid.Row>
                    <Image
                      fluid
                      className='center-hack'
                      size='huge'
                      style={{width: '60%', borderRadius: '100%', boxShadow: '2px 1px 5px rgba(0, 0, 0, 0.1)' }}
                      src='/images/will-doenlen-headshot.jpg'
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <Header as='h3' className='dswallau' style={{ fontSize: '2em', textAlign: 'center', paddingBottom: '0', marginTop: '25px' }}>Will Doenlen</Header>
                    <Header as='h3' style={{ fontSize: '1.5em', textAlign: 'center', paddingBottom: '0', marginTop: '10px' }}>Creator &amp; Developer</Header>
                    <p style={{ textAlign: 'justify', paddingLeft: '30px', paddingRight: '30px', fontSize: '1.15em' }} >Widely known for his <a href="http://www.huffingtonpost.com/2014/09/18/hamster-wheel-standing-de_n_5837086.html">hamster wheel standing desk</a>, Will Doenlen's art explores the existential absurdity of human systems
                    that provide us with symbolic value in our daily lives. You can view more of his projects
                    on his <a href="http://williardx.com">portfolio</a>. Will holds a BS from MIT.</p>
                  </Grid.Row>
                  <Grid.Row style={{textAlign: 'center', marginBottom: '50px'}}>
                    <a className='icons-link' href="https://twitter.com/_williardx/">
                      <Image
                        className='center-hack icons social-icons'
                        src='/images/TetzelCoin_twitter.png'
                      />
                    </a>
                    <a className='icons-link' href="https://www.linkedin.com/in/will-doenlen/">
                      <Image
                        className='center-hack icons social-icons'
                        src='/images/TetzelCoin_linkedin.png'
                      />
                    </a>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={6} padded='horizontally'>
                  <Grid.Row>
                    <Image
                      fluid
                      className='center-hack'
                      size='huge'
                      style={{width: '60%', borderRadius: '100%', boxShadow: '2px 1px 5px rgba(0, 0, 0, 0.1)' }}
                      src='/images/leanne-luce-headshot.jpg'
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <Header as='h3' className='dswallau' style={{ fontSize: '2em', textAlign: 'center', paddingBottom: '0', marginTop: '25px' }}>Leanne Luce</Header>
                    <Header as='h3' style={{ fontSize: '1.5em', textAlign: 'center', paddingBottom: '0', marginTop: '10px' }}>Designer</Header>
                    <p style={{ textAlign: 'justify', paddingLeft: '30px', paddingRight: '30px', fontSize: '1.15em' }}>Leanne is a designer, developer,
                    and fashion technologist based out of San Francisco.  You can visit her blog, <a href="https://thefashionrobot.com">the fashion robot</a> or view previous works in her <a href="https://leanneluce.com">portfolio</a>. Leanne holds a BFA from Rhode Island School of Design (RISD).</p>
                  </Grid.Row>
                  <Grid.Row style={{textAlign: 'center', marginBottom: '50px'}}>
                    <a className='icons-link' href="https://twitter.com/leanne_luce">
                      <Image
                        className='center-hack icons social-icons'
                        src='/images/TetzelCoin_twitter.png'
                      />
                    </a>
                    <a className='icons-link' href="https://www.linkedin.com/in/leanne-luce/">
                      <Image
                        className='center-hack icons social-icons'
                        src='/images/TetzelCoin_linkedin.png'
                      />
                    </a>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>



              <Grid.Row>
                <Grid.Column width={2}>
                </Grid.Column>
                <Grid.Column width={6} padded='horizontally'>
                  <Grid.Row>
                    <Image
                      fluid
                      className='center-hack'
                      size='huge'
                      style={{width: '60%', borderRadius: '100%', boxShadow: '2px 1px 5px rgba(0, 0, 0, 0.1)' }}
                      src='/images/Shoshi.png'
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <Header as='h3' className='dswallau' style={{ fontSize: '2em', textAlign: 'center', paddingBottom: '0', marginTop: '25px' }}>Shoshi</Header>
                    <Header as='h3' style={{ fontSize: '1.5em', textAlign: 'center', paddingBottom: '0', marginTop: '10px' }}>Legal Advisor &amp; Collaborator</Header>
                    <p style={{ textAlign: 'justify', paddingLeft: '30px', paddingRight: '30px', fontSize: '1.15em' }} >
                      Shoshi is an interactive sculpture composed of light, music, math and caffeine.
                      Her areas of professional expertise include law, fintech, blockchain technologies, and highly regulated industries. She holds many degrees, she promises.
                    </p>
                  </Grid.Row>

                </Grid.Column>
                <Grid.Column width={6} padded='horizontally'>
                  <Grid.Row>
                    <Image
                      fluid
                      className='center-hack'
                      size='huge'
                      style={{width: '60%', borderRadius: '100%', boxShadow: '2px 1px 5px rgba(0, 0, 0, 0.1)' }}
                      src='/images/Mike.jpg'
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <Header as='h3' className='dswallau' style={{ fontSize: '2em', textAlign: 'center', paddingBottom: '0', marginTop: '25px' }}>Michael Alan Huff</Header>
                    <Header as='h3' style={{ fontSize: '1.5em', textAlign: 'center', paddingBottom: '0', marginTop: '10px' }}>Event Collaborator</Header>
                    <p style={{ textAlign: 'justify', paddingLeft: '30px', paddingRight: '30px', fontSize: '1.15em' }}>
                      Michael is a self described &quot;human being&quot; who passionately fostering creative spaces around the
                      Bay Area. His current efforts are focused on creating events in <a href="http://rathskeller.club/">The Rathskeller Club</a>,
                      <a href="http://thegalallery.com/">The Galallery</a>, and <a href="http://www.conventartssf.com">The Convent</a>. 
                    </p>
                  </Grid.Row>
                  <Grid.Row style={{textAlign: 'center', marginBottom: '50px'}}>
                    <a className='icons-link' href="https://twitter.com/koalahamlet">
                      <Image
                        className='center-hack icons social-icons'
                        src='/images/TetzelCoin_twitter.png'
                      />
                    </a>
                    <a className='icons-link' href="https://www.linkedin.com/in/michael-alan-huff-822a3038/">
                      <Image
                        className='center-hack icons social-icons'
                        src='/images/TetzelCoin_linkedin.png'
                      />
                    </a>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>


            </Grid>
          </Container>
        </Segment>

        <Segment basic textAlign='center' style={{ padding: '8em 0em' }} vertical>
          <Container>
            <Header as='h3' style={{ fontSize: '2em' }}>Receive updates about TetzelCoin and the SIN token sale</Header>
            <MailchimpEmailForm
              u={this.props.mailchimp.u}
              id={this.props.mailchimp.id}
              signupUrl={this.props.mailchimp.signupUrl} />
          </Container>
        </Segment>

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
    )
  }
}
