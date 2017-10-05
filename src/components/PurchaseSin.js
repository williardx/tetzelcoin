import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  Table,
} from 'semantic-ui-react';

export default class PurchaseSin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sinValue: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({sinValue: event.target.value});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({sinValue: nextProps.sinValue});
  }

  render() {
    console.log(this.state.sinValue);
    return(
      <Container>
        <Header
          as='h1'
          content='Submit Payment' 
          textAlign='center'
          className='dswallau confess-header' 
        />
        <p>Now that you've confessed, submit your transaction to purchase your SIN tokens and obtain forgiveness.</p>
        <Form>
          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  Recipient
                </Table.Cell>
                <Table.Cell>
                  <Form.Input readOnly value='0x12345...'/>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Amount
                </Table.Cell>
                <Table.Cell>
                  <Form.Field>
                    <Input 
                      type='number'
                      min='0'
                      onChange={ this.handleChange } 
                      label={{basic: true, content: 'ETH'}}
                      value={ this.state.sinValue }
                      labelPosition='right'/>
                  </Form.Field>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Amount SIN Tokens to Receive
                </Table.Cell>
                <Table.Cell>
                  <Form.Field>
                    <Input 
                      value={ this.state.sinValue * 500 } 
                      readOnly 
                      label={{basic: true, content: 'SIN'}} 
                      labelPosition='right'/>
                  </Form.Field>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Button type="submit" primary size='big' className='btn-cta' onClick={() => this.props.onPay() }> Finish </Button>
        </Form>
      </Container>
    );
  }

}