import React, { Component } from 'react';

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
      <div>
        <h1>TetzelCoin</h1>
        <h4>
          TetzelCoin Address: 
          <span id="token_address">
            { this.props.tokenAddress || "Loading..." }
          </span>
        </h4>
        <label htmlFor="sin">
          Your sin:
          <input 
            type="text" 
            id="sin"
            value={ this.state.sin }
            placeholder="e.g., I shot a man in Reno"
            onChange={ this.onChangeSinInput.bind(this) }
            />        
        </label>

        <label htmlFor="pyment">
          Your payment:
          <input 
            type="text" 
            id="payment" 
            value={ this.state.payment }
            placeholder="e.g., 1 ETH"
            onChange={ this.onChangePaymentInput.bind(this) }
            />        
        </label>

        <button 
          id="confess" onClick={ () => this.props.onConfess(this.state.sin, this.state.payment) }>Confess</button>
      </div>
    );
  }

}

export default ConfessionBox;
