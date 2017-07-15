import React, { Component } from 'react';

class ConfessionBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      payment: null,
      sin: null
    };
  }

  clearStatus() {
    this.setState({statusMsg: ""});
  }

  render() {
    return (
      <div>
        <h1>TetzelCoin</h1>
        <h4>TetzelCoin Address: <span id="token_address">{ this.props.tokenAddress || "Loading..." }</span></h4>
        <br/><label htmlFor="sin">Your sin:</label><input type="text" id="sin" placeholder="e.g., I shot a man in Reno"></input>
        <br/><label htmlFor="pyment">Your payment:</label><input type="text" id="payment" placeholder="e.g., 1 ETH"></input>
        <br/><br/><button id="confess" onClick={ () => this.props.onConfess(this.state.sin, this.state.payment) }>Confess</button>
      </div>
    );
  }

}

export default ConfessionBox;
