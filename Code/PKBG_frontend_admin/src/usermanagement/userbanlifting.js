import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import 'whatwg-fetch';
import '../Login.css';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

const FormItem = Form.Item;

class userbanlifting extends React.Component {
    //禁止用户事件
    handleSubmit = (e) => {
        e.preventDefault();
        let url = "/user/userbanlifting";
        let formData = new FormData();
        formData.append('userid', this.props.form.getFieldValue("userid"));
        fetch(url, {
                method: 'post',
                mode: 'cors',
                body: formData
            }).then(function (response) {
            return response.text()
        }).then(function (body) {
                message.info(body);
            });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userid', {})(
                        <Input
                            prefix={< Icon type = "user" style = {{ fontSize: 13 }}/>}
                            placeholder="请输入您想解禁的用户id"/>
                    )}
                </FormItem>
                
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                   解禁该用户
                    </Button>
                </FormItem>
            </Form>
             
        );
    }
}
const WrappedNormaluserbanlifting = Form.create()(userbanlifting);
export default WrappedNormaluserbanlifting;
