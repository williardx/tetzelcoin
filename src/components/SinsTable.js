import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import Moment from 'react-moment';

class SinsTable extends Component {

  render() {

    var trs = this.props.recentSins.map((sinObj, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell><Moment fromNow={true} unix={true}>{ sinObj.timestamp }</Moment></Table.Cell>
          <Table.Cell>{ sinObj.sinner }</Table.Cell>
          <Table.Cell>{ sinObj.payment }</Table.Cell>
          <Table.Cell>{ sinObj.sin }</Table.Cell>
        </Table.Row>
      );
    });

    return(
      <Table celled selectable fixed>
        <Table.Header>
          <Table.HeaderCell>Time</Table.HeaderCell>
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
