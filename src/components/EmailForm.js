import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import jsonp from 'jsonp';

export default class EmailForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        MERGE0: '',
        b_name: '',
        b_email: '',
        b_comment: '',
        u: 'b15551cd2bb3421b361f0f897',
        id: 'f7e39aeb69'
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  async handleSubmit() {
    const url = 'https://tetzelcoin.us16.list-manage.com/subscribe/post-json?' + this.serialize(this.state.form);

    jsonp(url, {param: 'c'}, (err, data) => {
      console.log(err);
      console.log(data);
    });

  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit} >
        <input type="hidden" name="u" value="b15551cd2bb3421b361f0f897" />
        <input type="hidden" name="id" value="f7e39aeb69" />
        <div 
          aria-label="Please leave the following three fields empty" 
          style={{position: 'absolute', left: '-9999px'}}>
          <label for="b_name">Name: </label>
          <input 
            type="text" 
            name="b_name" 
            tabindex="-1" 
            value={this.state.b_name}
            onChange={this.handleInputChange}
            placeholder="Freddie" id="b_name" />
          <label for="b_email">Email: </label>
          <input 
            type="email" 
            name="b_email" 
            tabindex="-1" 
            onChange={this.handleInputChange}
            value={this.state.b_email} 
            placeholder="youremail@gmail.com" 
            id="b_email" />
          <label for="b_comment">Comment: </label>
          <textarea 
            name="b_comment" 
            tabindex="-1" 
            placeholder="Please comment"
            onChange={this.handleInputChange}
            id="b_comment">{this.state.b_comment}</textarea>
        </div>
        <Form.Input 
          type="email"
          autocapitalize="off"
          autocorrect="off"
          name="MERGE0"
          value={this.state.email}
          placeholder='your@email.com'
          onChange={this.handleInputChange} />
        <Form.Button content='submit' type='submit' />
      </Form>
    )
  }

}