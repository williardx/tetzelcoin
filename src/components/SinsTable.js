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
      var tweet = `https://twitter.com/home?status=${ sinObj.sin } tetzelcoin.com`;

      return ([
        <Grid.Row className='sins-table' only='tablet computer' key={2 * i}>
          <Grid.Column width={3} className='sinner-field'>
            <p>SINNER:<span className="courier">{ sinObj.sinner }</span><br/>
            RECIPIENT:<span className="courier">{ sinObj.recipient }</span></p>
          </Grid.Column>
          <Grid.Column width={11}>
            <p className='confession-sin'>{ sinObj.sin }</p>
          </Grid.Column>
          <Grid.Column width={2} textAlign="right">
            <p className='sin-value'>{ sinValue } SIN </p>
            <a className="pull-right" target="_blank" href={tweet}><Icon className="lt-gray" name="twitter" size="large" /></a>
          </Grid.Column>
        </Grid.Row>,
        <Grid.Row className='sins-table' only='mobile' key={2 * i + 1}>
          <Grid className='sins-table mobile-subgrid'>
            <Grid.Row textAlign='justified'>
              <Grid.Column width={16}>
                <p className='sins-table mobile-subgrid sin-text'>
                  { sinObj.sin }
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{padding:0}}>
              <Grid.Column width={11} className='sinner-field'>
                <p className="sins-table" style={{padding:0}}>SINNER:<span className="courier">{ sinObj.sinner }</span></p>
                <p className="sins-table" style={{padding:0}}>RECIPIENT:<span className="courier">{ sinObj.recipient }</span></p>
              </Grid.Column>
              <Grid.Column width={5} textAlign="right">
                <p className="sins-table sins" style={{padding:'0px 0px 8px 0px'}}>{ sinValue } SIN</p>
                <a target="_blank" href={tweet}><Icon className="lt-gray" name="twitter" size="large" /></a>
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
