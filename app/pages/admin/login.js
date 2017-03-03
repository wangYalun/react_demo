import React from 'react';
import { Link, hashHistory, browserHistory } from 'react-router';
import { api_base } from '../../apis/Api_base';
import util from '../../utils/util';

import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
const FormItem = Form.Item;

require('./admin.css');




class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        api_base.request({
          method:'post',
          url:'/api_login/login',
          data:values
        }).done(function(res){
          if(res.msg==='success'){
            message.success('登录成功！');
            //登录成功后将用户信息和login_token存入sessionStorage
            util.setSessionStorage('userinfo',res.data);
            setTimeout(function(){
              hashHistory.push('/realtime');
            },2000);
          }else{
            message.error(res.msg);
          }
          //message[res.msg==='success'?'success':'error'](res.msg);
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
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



