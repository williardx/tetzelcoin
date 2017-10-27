import React, { Component } from 'react';
import {
  Button,
  Embed,
  Modal,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import '../css/dswallau.css';
import '../css/terms.css';

export default class TermsAndConditionsModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  close = () => this.setState({open: false});

  render() {
    return (
      <div id="terms-modal">
        <Modal open={ this.state.open }>
          <Modal.Header>
            Terms and Conditions
          </Modal.Header>
          <Modal.Content scrolling>
            <Embed
              active={true}
              iframe={{
                src: "https://docs.google.com/viewer?srcid=0B7t2SoXRiUoXUXU3NTRHSXpsNTA&pid=explorer&efh=false&a=v&chrome=false&embedded=true",
              }} />
          </Modal.Content>
          <Modal.Actions className='terms-and-conditions'>
            <p className='terms-and-conditions-link-text'>Having trouble? <a href="https://drive.google.com/open?id=0B7t2SoXRiUoXUXU3NTRHSXpsNTA">Click here to view the terms and conditions.</a></p>
            <div className='terms-and-conditions actions-buttons'>
              <Link to='/'><Button primary size='big' className='btn-cta'>Exit</Button></Link>
              <Button primary size='big' className='btn-dark' onClick={ this.close }>Accept Terms</Button>
            </div>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

}
