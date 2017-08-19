import React, { Component } from 'react';
import { Button, Grid, Form, Message } from 'semantic-ui-react';
import jsonp from 'jsonp';

import '../css/mailchimp-email-form.css';

export default class MailchimpEmailForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: null,
      status: null,
      form: {
        MERGE0: '',
        b_name: '',
        b_email: '',
        b_comment: '',
        u: props.u,
        id: props.id
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    let form = JSON.parse(JSON.stringify(this.state.form));
    form[name] = value;
    this.setState({form: form})
  }

  serialize(obj) {
    return Object.keys(obj).map(function(key) {
      return key + '=' + obj[key];
    }).join('&');
  }

  subscribe(formData) {
    let url = this.props.signupUrl + '?' + this.serialize(formData);
    this.setState({status: 'sending', msg: 'Sending...'}, 
      () => jsonp(url, {param: 'c'}, (err, data) => {
        if (err) {
          this.setState({status: 'error', msg: err});
        } else if (data.result !== 'success') {
          this.setState({status: 'error', msg: data.msg});
        } else {
          this.setState({status: 'success', msg: data.msg});
        }
      })
    );
  }

  render() {
    return(
      <div>
        <Form 
          onSubmit={() => this.subscribe(this.state.form)}
          loading={this.state.status === 'sending'}>
          <div 
            aria-label='Please leave the following three fields empty' 
            style={{position: 'absolute', left: '-9999px'}}>
            <label for='b_name'>Name: </label>
            <input 
              type='text' 
              name='b_name' 
              tabindex='-1' 
              value={this.state.b_name}
              onChange={this.handleInputChange}
              placeholder='Freddie' id='b_name' />
            <label for='b_email'>Email: </label>
            <input 
              type='email' 
              name='b_email' 
              tabindex='-1' 
              onChange={this.handleInputChange}
              value={this.state.b_email} 
              placeholder='youremail@gmail.com' 
              id='b_email' />
            <label for='b_comment'>Comment: </label>
            <textarea 
              name='b_comment' 
              tabindex='-1' 
              placeholder='Please comment'
              onChange={this.handleInputChange}
              id='b_comment'>{this.state.b_comment}</textarea>
          </div>
          <Grid>
            <Grid.Row centered columns={2}>
              <Grid.Column>
                <Form.Input 
                  className='email-input'
                  type='email'
                  required
                  autocapitalize='off'
                  autocorrect='off'
                  name='MERGE0'
                  value={this.state.email}
                  placeholder='your@email.com'
                  onChange={this.handleInputChange} />
              </Grid.Column>
              <Grid.Column>
                <Button primary size='big' className='btn-cta' type='submit'>
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        {this.state.status === null ? null : 
          <Message
            compact
            positive={this.state.status === 'success'}
            negative={this.state.status === 'error'}>
            <Message.Content>
              <p style={{paddingBottom: 0}}>{this.state.msg}</p>
            </Message.Content>
          </Message>}
      </div>
    )
  }

}