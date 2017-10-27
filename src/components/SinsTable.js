import React, { Component } from 'react';
import {
  Grid,
  List,
  Button,
  Icon,
  Header,
  Popup
} from 'semantic-ui-react';
import Moment from 'react-moment';

import '../css/sinstable.css';

class SinsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      tweetTxt: '',
      reversedSins: props.recentSins.sort((a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
      })
    };
  }

  render() {

    var startIndex = (this.state.currentPage - 1) * this.props.sinsPerPage;
    var endIndex = startIndex + this.props.sinsPerPage;

    var trs = this.state.reversedSins.slice(startIndex, endIndex).map((sinObj, i) => {
      var sinValue = (sinObj.payment * 500).toFixed(2);
      var tweet = `https://twitter.com/home?status=${ sinObj.sin }`;

      return ([
        <Grid.Row className='sins-table' only='tablet computer' key={2 * i}>
          <Grid.Column width={2} textAlign="center">
            <Moment fromNow={true} unix={true}>{ sinObj.timestamp }</Moment>
          </Grid.Column>
          <Grid.Column width={2} className='sinner-field'>{ sinObj.sinner }</Grid.Column>
          <Grid.Column width={8}>
          <Popup
            trigger={
                <span>
                  { sinObj.sin }
                </span>
              }
            on='hover'
            className='tweet-pop'
            position='top center'
            hoverable >
            <a target="_blank" href={tweet}><Icon className="text-center" name="twitter" size="large" /></a>
          </Popup>
          </Grid.Column>
          <Grid.Column width={2} className='sinner-field'>{ sinObj.recipient }</Grid.Column>
          <Grid.Column width={2} textAlign="center">{ sinValue }</Grid.Column>
        </Grid.Row>,
        <Grid.Row className='sins-table' only='mobile' key={2 * i + 1}>
          <Grid className='sins-table mobile-subgrid'>
            <Grid.Row textAlign='center' style={{padding:0}}>
              <Grid.Column width={16} textAlign="center">
                <p className="sins-table" style={{padding:0}}><Moment fromNow={true} unix={true}>{ sinObj.timestamp }</Moment>...</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign='justified'>
              <Grid.Column width={16}>
                <p className='sins-table mobile-subgrid sin-text'>
                  CONFESSION: &nbsp; { sinObj.sin }
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{padding:0}}>
              <Grid.Column width={8} className='sinner-field'>
                <p className="sins-table" style={{padding:0}}>SINNER: &nbsp; { sinObj.sinner }</p>
              </Grid.Column>
              <Grid.Column width={8} className='sinner-field'>
                <p className="sins-table" style={{padding:0}}>RECIPIENT: &nbsp; { sinObj.recipient }</p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={14} textAlign="left">
                <p className="sins-table" style={{padding:0}}>SIN VALUE: { sinValue } SIN</p>
              </Grid.Column>
              <Grid.Column width={2}>
                <a target="_blank" href={tweet}><Icon className="text-center" name="twitter" size="large" /></a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Row>
      ]);
    });

    if (this.props.recentSins.length % this.props.sinsPerPage > 0) {
      var numPages = Math.floor(this.props.recentSins.length / this.props.sinsPerPage) + 1;
    } else {
      var numPages = Math.floor(this.props.recentSins.length / this.props.sinsPerPage);
    }

    var pagerItems = new Array(numPages).fill(undefined).map((val, i) => {
      let classes = 'sins-table pager-item';
      if (this.state.currentPage === (i + 1)) classes += ' active';
      return (
          <List.Item
            key={i}
            className={ classes }
            onClick={ () => this.setState({currentPage: i + 1}) }>{ i + 1 }</List.Item>
      );
    });

    return(
      <div>
        <Grid className='sins-table main-grid'>
          <Grid.Row className='sins-table' only='tablet computer'>
            <Grid.Column textAlign="center" width={2}>Time</Grid.Column>
            <Grid.Column textAlign="center" width={2}>Sinner</Grid.Column>
            <Grid.Column textAlign="center" width={8}>Confession</Grid.Column>
            <Grid.Column textAlign="center" width={2}>
              <Popup
                trigger={
                  <span>SIN Recipient</span>
                  }
                on='hover'
                position='top center'
                hoverable >
                <span className="gray"><strong>What is this?</strong><br />
                You can confess and send your SIN tokens to someone else.</span>
              </Popup>
            </Grid.Column>
            <Grid.Column textAlign="center" width={2}>SIN Value</Grid.Column>
          </Grid.Row>
          { trs }
        </Grid>
        <List className='sins-table pager' horizontal>
          { pagerItems }
        </List>
      </div>
    );

  }

}

export default SinsTable;
