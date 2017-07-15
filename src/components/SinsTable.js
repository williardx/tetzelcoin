import React, { Component } from 'react';



class SinsTable extends Component {

  async instantiateFilter() {
    var sinFilter = this.props.web3.eth.filter({
      address: this.props.tetzel.address,
      fromBlock: 1,
      toBlock: 'latest'
    });

    sinFilter.watch(console.log);

  }


}

export default SinsTable;