import React, { Component } from 'react';
import { 
  Button,
  Form,
} from 'semantic-ui-react';

class ConfessionBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      payment: "",
      sin: ""
    };
  }

  onChangeSinInput(event) {
    this.setState({ sin: event.target.value });
  }

  onChangePaymentInput(event) {
    this.setState({ payment: event.target.value });
  }

  render() {
    return (
      <Form>
        <Form.Input
          label="Your Sin"
          type="text"
          value={ this.state.sin }
          placeholder="e.g., I shot a man in Reno"
          onChange={ this.onChangeSinInput.bind(this) } />
        <Form.Input
          label="Your Payment"
          type="text" 
          id="payment" 
          value={ this.state.payment }
          placeholder="e.g., 1 ETH"
          onChange={ this.onChangePaymentInput.bind(this) } />
        <Button
          type="submit"
          onClick={ () => this.props.onConfess(this.state.sin, this.state.payment) }>
          Confess
        </Button>
      </Form>
    );
  }

}

export default ConfessionBox;
