import React from 'react';
import { Link, hashHistory, browserHistory } from 'react-router';
import { api_base } from '../../apis/Api_base';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

require('./admin.css');




class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}

          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="register">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}
const TheLoginForm=Form.create()(LoginForm);
export default React.createClass({
    render(){
        return (<div id="components-login-form">
            <div className="logo"/>
            <TheLoginForm/>
        </div>);
    }
})



