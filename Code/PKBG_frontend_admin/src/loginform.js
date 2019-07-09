import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import 'whatwg-fetch';
import './Login.css';
import './config';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { the_config } from './config';
import axios from 'axios';
import { format } from 'url';
const FormItem = Form.Item;

class Login extends React.Component {
    //登录事件


    constructor(props){
      super(props);
      this.state={
        users:[],
        isLoaded:false,
        label:[],
      }
    
    }
    


    handleSubmit = (e) => {
        e.preventDefault();
        let url = "/user/login";
        let formData = new FormData();
        formData.append('username', this.props.form.getFieldValue("username"));
        formData.append('userpwd', this.props.form.getFieldValue("userpwd"));
        the_config.username=this.props.form.getFieldValue("username");
       
 
        fetch(url, {
                method: 'post',
                mode: 'cors',
                body: formData
            }).then(function (response) {
               return response.text()
           
        }).then(function (body) {
                message.info(body);
            });

            const _this=this;
            axios.get("user/checkuser")
            .then(function (response) {
              _this.setState({
                users:response.data,
                isLoaded:true
              });
            })
            .catch(function (error) {
              console.log(error);
              _this.setState({
                isLoaded:false,
                error:error
              })
            })
          
            const w=window.open('about:blank');
            w.location.href="/usermanagement" 

 }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {})(
                        <Input
                            prefix={< Icon type = "user" style = {{ fontSize: 13 }}/>}
                            placeholder="帐号"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('userpwd', {})(
                        <Input
                            prefix={< Icon type = "lock" style = {{ fontSize: 13 }}/>}
                            type="password"
                            placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary"  htmlType="submit"  className="login-form-button">
                        登录
                    </Button>
                    Or <a><Link to="/register"> register now!</Link> </a>
                </FormItem>
            </Form>
             
        );
    }
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;




/*
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import React, { Component } from 'react';
import './loginform.css'
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
class NormalLoginForm extends React.Component {
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
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a><Link to="/register"> register now!</Link> </a>
        </Form.Item>
      </Form>
    );
  }
}


export default NormalLoginForm;


*/
