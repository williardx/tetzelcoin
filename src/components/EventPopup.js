import React from 'react'
import { Button, Grid, Header, Popup, Image } from 'semantic-ui-react'

const timeoutLength = 1000500
const invites = [
  {
    button: <div><h2>You're invited!</h2>
      <img src='/images/Will3-Tetzel-Small.jpg' />
      <p><small>Join us for our In-Person Confessional Event November 1st at the Convent Arts Collective in San Francisco!</small></p>
      <Button primary size='big' target='none' href="https://www.eventbrite.com/e/tetzelcoin-in-person-confessional-tickets-38795145324?aff=eac2" className='btn-cta' content='RSVP on Eventbrite' /></div>,
  },
]

export default class EventPopup extends React.Component {
  state = { isOpen: true }

  handleOpen = () => {
    this.setState({ isOpen: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false })
    }, timeoutLength)
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    clearTimeout(this.timeout)
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={8}>
          {invites.map((invite, i) => (
            <Popup className='event-popup'
              key={i}
              trigger={<Button size='big' className='event-popup' content='Attend Our In-Person Confessional!' />}
              content={invite.button}
              on='click'
              open={this.state.isOpen}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              position='top right'
            />
          ))}
        </Grid.Column>
      </Grid>
    )
  }
}
