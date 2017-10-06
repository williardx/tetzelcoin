import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import Moment from 'react-moment';

import '../css/sinstable.css'

class SinsTable extends Component {

  render() {

    var trs = this.props.recentSins.map((sinObj, i) => {
      return (
        <Grid.Row key={i}>
          <Grid.Column width={2} textAlign="center">
            <Moment fromNow={true} unix={true}>{ sinObj.timestamp }</Moment>
          </Grid.Column>
          <Grid.Column width={2} className='sinner-field'>{ sinObj.sinner }</Grid.Column>
          <Grid.Column width={8} textAlign="center">{ sinObj.sin }</Grid.Column>
          <Grid.Column width={2} textAlign="center">{ sinObj.payment }</Grid.Column>
          <Grid.Column width={2} textAlign="center">{ sinObj.payment * 500 }</Grid.Column>          
        </Grid.Row>
      );
    });

    return(
      <Grid divided='vertically'>
        <Grid.Row>
          <Grid.Column textAlign="center" width={2}>Time</Grid.Column>
          <Grid.Column textAlign="center" width={2}>Sinner</Grid.Column>
          <Grid.Column textAlign="center" width={8}>Confession</Grid.Column>
          <Grid.Column textAlign="center" width={2}>ETH Paid</Grid.Column>
          <Grid.Column textAlign="center" width={2}>SIN Received</Grid.Column>
        </Grid.Row>
        { trs }
      </Grid>
    );

  }
}

export default SinsTable;
