import React, { Component } from 'react';

class SinsTable extends Component {

  render() {

    var trs = this.props.recentSins.map((sinObj, i) => {
      return (
        <tr key={i}>
          <td>{ sinObj.blockNumber }</td>
          <td>{ sinObj.sinner }</td>
          <td>{ sinObj.sin }</td>
          <td>{ sinObj.payment }</td>
          <td>{ sinObj.sinHash }</td>
        </tr>
      );
    });

    return(
      <table>
        <thead>
          <td>Block Number</td>
          <td>Sinner</td>
          <td>Sin</td>
          <td>Payment (ETH)</td>
          <td>Sin Hash Value</td>
        </thead>
        <tbody>
          { trs }
        </tbody>
      </table>
    );

  }
}

export default SinsTable;
