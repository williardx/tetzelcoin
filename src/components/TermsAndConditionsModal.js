import React, { Component } from 'react';
import {
  Button,
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
          <Modal.Content>
            TODO: Insert terms and conditions here
          </Modal.Content>
          <Modal.Actions>
            <Link to='/'><Button primary size='big' className='btn-cta'>Exit</Button></Link>
            <Button primary size='big' className='btn-dark' onClick={ this.close }>Accept Terms</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

}
