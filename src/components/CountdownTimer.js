import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import CountdownBox from './CountdownBox';

import '../css/countdown-timer.css';

export default class CountdownTimer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid stackable columns={4}>
        <Grid.Column>
         <CountdownBox unit='Days' value='90' />
        </Grid.Column>
        <Grid.Column>
         <CountdownBox unit='Hours' value='20' />
        </Grid.Column>
        <Grid.Column>
         <CountdownBox unit='Minutes' value='11' />
        </Grid.Column>
        <Grid.Column>
          <CountdownBox unit='Seconds' value='03' />
        </Grid.Column>
      </Grid>
    );
  }

};
