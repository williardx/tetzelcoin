import React, { Component } from 'react';
import {
  Grid,
  List,
} from 'semantic-ui-react';
import Moment from 'react-moment';

import '../css/sinstable.css'

class SinsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
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
      return ([
        <Grid.Row className='sins-table' only='tablet computer' key={2 * i}>
          <Grid.Column width={2} textAlign="center">
            <Moment fromNow={true} unix={true}>{ sinObj.timestamp }</Moment>
          </Grid.Column>
          <Grid.Column width={2} className='sinner-field'>{ sinObj.sinner }</Grid.Column>
          <Grid.Column width={8} textAlign="center">{ sinObj.sin }</Grid.Column>
          <Grid.Column width={2} className='sinner-field'>{ sinObj.recipient }</Grid.Column>
          <Grid.Column width={2} textAlign="center">{ sinValue }</Grid.Column>          
        </Grid.Row>,
        <Grid.Row className='sins-table' only='mobile' key={2 * i + 1}>
          <Grid className='sins-table mobile-subgrid'>
            <Grid.Row textAlign='center'>
              <Grid.Column width={16}>
                <p className='sins-table mobile-subgrid sin-text'>{ sinObj.sin }</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={6} textAlign="center">
                <Moment fromNow={true} unix={true}>{ sinObj.timestamp }</Moment>
              </Grid.Column>
              <Grid.Column width={3} className='sinner-field'>{ sinObj.sinner }</Grid.Column>
              <Grid.Column width={3} className='sinner-field'>{ sinObj.recipient }</Grid.Column>
              <Grid.Column width={6} textAlign="center">{ sinValue } SIN</Grid.Column>
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
            <Grid.Column textAlign="center" width={2}>SIN Recipient</Grid.Column>
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
