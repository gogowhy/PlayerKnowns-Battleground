import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import 'whatwg-fetch';
import '../Login.css';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

const FormItem = Form.Item;

class userforbid extends React.Component {
    //禁止用户事件
    handleSubmit = (e) => {
        e.preventDefault();
        let url = "/user/userforbid";
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
                            placeholder="请输入您想禁止的用户id"/>
                    )}
                </FormItem>
                
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                   禁止该用户
                    </Button>
                </FormItem>
            </Form>
             
        );
    }
}
const WrappedNormaluserforbid = Form.create()(userforbid);
export default WrappedNormaluserforbid;
