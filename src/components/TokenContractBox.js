import React, { Component } from 'react';

class TokenContractBox extends Component {
  render() {
    return (
      <h4>
        TetzelCoin Token Contract:
        <span id="token_address">
          { this.props.tokenAddress || "Loading..." }
        </span>
      </h4>
    );
  }
}

export default TokenContractBox;
