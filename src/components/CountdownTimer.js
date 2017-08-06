import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import CountdownBox from './CountdownBox';

import '../css/countdown-timer.css';

export default class CountdownTimer extends Component {

  constructor(props) {
    super(props);
    let secondsLeft = this.props.targetTime 
                        - Math.floor((new Date().getTime() / 1000));
    this.state = {
      time: {},
      seconds: secondsLeft,
      timer: 0,
    };
    
    this.countdown = this.countdown.bind(this);

  } 

  secondsToTime(secs){
    return {
      'days': Math.floor(secs / (60 * 60 * 24)),
      'hours': Math.floor(secs / (60 * 60) % 24),
      'minutes': Math.floor(secs / 60 % 60),
      'seconds': secs % 60
    };
  }

  countdown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.state.timer);
    }
  }

  startTimer() {
    if (this.state.timer === 0) {
      this.setState({timer: setInterval(this.countdown, 1000)});
    }
  }

  componentDidMount() {
    let timeLeftObj = this.secondsToTime(this.state.seconds);
    this.setState({time: timeLeftObj});
    this.startTimer();
  }

  render() {
    return(
      <Grid stackable columns={4}>
        <Grid.Column>
         <CountdownBox unit='Days' value={this.state.time.days} />
        </Grid.Column>
        <Grid.Column>
         <CountdownBox unit='Hours' value={this.state.time.hours} />
        </Grid.Column>
        <Grid.Column>
         <CountdownBox unit='Minutes' value={this.state.time.minutes} />
        </Grid.Column>
        <Grid.Column>
          <CountdownBox unit='Seconds' value={this.state.time.seconds} />
        </Grid.Column>
      </Grid>
    );
  }

};
