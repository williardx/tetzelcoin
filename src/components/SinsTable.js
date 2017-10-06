import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import Moment from 'react-moment';

class SinsTable extends Component {

  render() {

    var trs = this.props.recentSins.map((sinObj, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell textAlign="center">
            <Moment fromNow={true} unix={true}>{ sinObj.timestamp }</Moment>
          </Table.Cell>
          <Table.Cell>{ sinObj.sinner }</Table.Cell>
          <Table.Cell textAlign="center">{ sinObj.payment }</Table.Cell>
          <Table.Cell>{ sinObj.sin }</Table.Cell>
        </Table.Row>
      );
    });

    return(
      <Table basic='very' selectable fixed>
        <Table.Header>
          <Table.HeaderCell textAlign="center" width={2}>Time</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>Sinner</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={2}>ETH Paid</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" width={8}>Sin</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { trs }
        </Table.Body>
      </Table>
    );

  }
}

export default SinsTable;
