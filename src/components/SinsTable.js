import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class SinsTable extends Component {

  render() {

    var trs = this.props.recentSins.map((sinObj, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell>{ sinObj.blockNumber }</Table.Cell>
          <Table.Cell>{ sinObj.sinner }</Table.Cell>
          <Table.Cell>{ sinObj.payment }</Table.Cell>
          <Table.Cell>{ sinObj.sin }</Table.Cell>
        </Table.Row>
      );
    });

    return(
      <Table celled selectable fixed>
        <Table.Header>
          <Table.HeaderCell>Block Number</Table.HeaderCell>
          <Table.HeaderCell>Sinner</Table.HeaderCell>
          <Table.HeaderCell>Payment (ETH)</Table.HeaderCell>
          <Table.HeaderCell>Sin</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { trs }
        </Table.Body>
      </Table>
    );

  }
}

export default SinsTable;
