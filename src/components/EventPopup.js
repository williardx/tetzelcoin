import React, { Component } from 'react';
import { 
  Button, 
  Popup,
  Icon, 
} from 'semantic-ui-react';

export default class EventPopup extends Component {
  
  state = { isOpen: true }
  timeoutLength = 1000500;

  handleOpen = () => {
    this.setState({ isOpen: true });

    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false })
    }, this.timeoutLength);
  }

  handleClose = () => {
    this.setState({ isOpen: false });
    clearTimeout(this.timeout);
  }

  render() {

    const eventbriteUrl = 'https://www.eventbrite.com/e/tetzelcoin-in-person-confessional-tickets-38795145324?aff=eac2';

    const invite = () => {
      return(
        <div>
          <h2>You're invited!</h2>
          <img src='/images/Will3-Tetzel-Small.jpg' />
          <p><small>Join us for our In-Person Confessional Event November 1st at the Convent Arts Collective in San Francisco!</small></p>
          <Button 
            primary 
            size='big' 
            target='none' 
            href={eventbriteUrl} 
            className='btn-cta' 
            content='RSVP on Eventbrite' />
        </div>
      );
    };

    const btnTrigger = () => {
      return (
        <Button size='big' className='event-popup'>
          Attend Our In-Person Confessional! 
          <Icon name='close' onClick={ this.props.togglePopupVisibility } />
        </Button>
      );
    }

    return (
      <Popup className='event-popup'
        trigger={ btnTrigger() }
        content={ invite() }
        on='click'
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position='top right' />
    );
  }
}
