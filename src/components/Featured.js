import React, { Component } from 'react';
import {
  Container,
  Image,
  Segment,
  Header,
  Grid,
} from 'semantic-ui-react'

export default class Featured extends Component {
  render() {
    return(
      <div className='featured'>
        <Segment className='dark-gray-background' style={{ padding: '8% 0em' }} vertical>
          <Container>
            <Grid stackable verticalAlign='middle'>
              <Grid.Row>
                <Header as='h3' className='center-hack' style={{ fontSize: '1.5em', paddingBottom: '1em' }}>In the Media:</Header>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4} padded='horizontally' className='media-img'>
                  <a href="https://www.bloomberg.com/view/articles/2017-10-17/what-is-an-ico-anyway-a-few-theories">
                    <Image
                      className='center-hack'
                      fluid
                      style={{height: '100%'}}
                      src='/images/bloomberg.png'
                    />
                  </a>
                </Grid.Column>
                <Grid.Column width={4} padded='horizontally' className='media-img'>
                  <a href="https://soundcloud.com/theeconomist/money-talks-ico-bubble-with">
                    <Image
                      className='center-hack'
                      fluid
                      style={{height: '100%'}}
                      src='/images/the-economist.png'
                    />
                  </a>
                </Grid.Column>
                <Grid.Column width={4} padded='horizontally' className='media-img'>
                  <a href="http://www.the-blockchain.com/2017/11/01/tetzelcoin-launches-sin-token-tokenize-forgiveness/">
                    <Image
                      className='center-hack'
                      fluid
                      style={{width: '65%'}}
                      src='/images/blockchain-news.png'
                    />
                  </a>
                </Grid.Column>
                <Grid.Column width={4} padded='horizontally' className='media-img'>
                  <a href="https://keepingstock.net/tetzelcoin-a-token-for-forgiveness-b1ba34f2ef71">
                    <Image
                      className='center-hack'
                      fluid
                      style={{height: '100%'}}
                      src='/images/keeping-stock.png'
                    />
                  </a>
                </Grid.Column>

              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
  )};
}
