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
      reversedSins: [],
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      // Sort by most recent first      
      reversedSins: props.recentSins.sort((a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
      })
    });
  }

  render() {

    var startIndex = (this.state.currentPage - 1) * this.props.sinsPerPage;
    var endIndex = startIndex + this.props.sinsPerPage;
    var trs = this.state.reversedSins.slice(startIndex, endIndex).map((sinObj, i) => {
      return (
        <Grid.Row className='sins-table' key={i}>
          <Grid.Column width={2} textAlign="center">
            <Moment fromNow={true} unix={true}>{ sinObj.timestamp }</Moment>
          </Grid.Column>
          <Grid.Column width={2} className='sinner-field'>{ sinObj.sinner }</Grid.Column>
          <Grid.Column width={10} textAlign="center">{ sinObj.sin }</Grid.Column>
          <Grid.Column width={2} textAlign="center">{ sinObj.payment * 500 }</Grid.Column>          
        </Grid.Row>
      );
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
        <Grid divided='vertically'>
          <Grid.Row>
            <Grid.Column textAlign="center" width={2}>Time</Grid.Column>
            <Grid.Column textAlign="center" width={2}>Sinner</Grid.Column>
            <Grid.Column textAlign="center" width={10}>Confession</Grid.Column>
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
