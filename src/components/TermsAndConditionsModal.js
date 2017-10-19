import React, { Component } from 'react';
import {
  Button,
  Modal,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
      <div>
        <Modal open={ this.state.open }>
          <Modal.Header>
            Terms and Conditions
          </Modal.Header>
          <Modal.Content>
            TODO: Insert terms and conditions here
          </Modal.Content>
          <Modal.Actions>
            <Link to='/'><Button>Go Back</Button></Link>
            <Button onClick={ this.close }>Accept Terms</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

}