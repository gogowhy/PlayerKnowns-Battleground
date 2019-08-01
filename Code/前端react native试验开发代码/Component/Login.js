import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Form, Text, Button } from 'native-base';
import Name from './InputComponents/Name';
import Password from './InputComponents/Password';
import base from '../src/style/base';

import axios from 'axios';

/** 定义了同后端传递和接收指令的 Code 用来处理不同种类的 登录的响应状态 */
const USERNAME = 3, PASSWORD = 2, BANNED = 0;

/* 组件 : Login
-- 作用 : 收集用户登录信息，并提交至后端
*/
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [],//用户名0,密码1
        }
        this.forgetPW = this.forgetPW.bind(this);
        this.login = this.login.bind(this);
        this.gotoRegister = this.gotoRegister.bind(this);
    }

    changeInputFocus = index => () => {
        if (index === 0) {
            this.state.inputs[index + 1].state.inputRef._root.focus(); // eslint-disable-line
        }
    }

    updateCanLoginState = () => {
        let canLogin = true;
        this.state.inputs.forEach((child) => {
            if (child.state.isCorrect !== 1) {
                canLogin = false;
            }
        })
    }

    clearAllInputs = () => {
        this.state.inputs.forEach((child) => {
            child.clearInput();
        });
    };

    /** 跳转到注册界面 */
    gotoRegister() {
        const { navigate } = this.props.navigation;
        navigate('Register');
    }

    /**
     * 功能 ：登录
     * 触发 ：点击“登录”按钮
     * 
     * 向后端发送 用户名 和 密码 ，并接收是否成功登录的指令 ，然后决定是否进行跳转
     */
    async    login() {

        const _this = this;

        const url = "http://49.234.27.75:2001/user/login";

        var code = -1;

        let data = {
            username: _this.state.inputs[0].state.value,
            userpassword: _this.state.inputs[1].state.value,
        }
        await axios.post(url, data)
            .then(function (response) {
                // handle success
                code = response.data;
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        switch (code) {
            //成功登录，跳转页面
            case 1: const { navigate } = this.props.navigation;
                navigate('MainPage', { username: this.state.inputs[0].state.value }); break;
            // USERNAME即用户名不存在，在该文件 Login.js 顶部已定义
            case USERNAME: alert("用户名不存在！"); break;
            // PASSWORD即密码错误，在该文件 Login.js 顶部已定义
            case PASSWORD: alert("密码错误！"); break;
            // BANNED 即用户被禁用，在该文件 Login.js 顶部已定义
            case BANNED: alert("您的用户已被禁用，请联系管理员处理。"); break;
            default: alert("请输入用户名和密码！"); break;
        }

        /* 以下为测试用代码 
        const { navigate } = this.props.navigation ; 
        navigate('MainPage' , {username : this.state.username});
        /* 以上为测试用代码 */
    }

    /**
     *  功能 ：忘记密码
     *  触发 ：点击“忘记密码”按钮
     * 
     *  向后端发送用户名，根据此用户名绑定的邮箱账号发送邮件重置密码 
     * 
     */
    async    forgetPW() {


        const _this = this;

        const url = "http://49.234.27.75:2001/user/resetPass";

        let data = {
            username: _this.state.inputs[0].state.value,
        }

        var code = 1;
        await axios.post(url, data)
            .then(function (response) {
                // handle success

                code = response.data;
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                code = -2;
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        switch (code) {
            case 0: alert("我们将发送一封邮件到您用户名绑定的邮箱中，请根据邮件中的提示完成找回密码的功能。"); break;
            case 1: alert("该用户名不存在！"); break;
            case -2: alert("服务器异常！"); break;
            default: alert("未响应！"); break;
        }

    }

    render() {

        return (
            <ImageBackground style={base.background}
                source={require('../src/img/ppp0.jpg')}>
                <View style={base.container}>

                    <Form>
                        <Name
                            changeFocus={this.changeInputFocus(0)}
                            update={this.updateCanLoginState}
                            ref={(ref) => { this.state.inputs[0] = ref; }}
                        />
                        <Password
                            changeFocus={this.changeInputFocus(1)}
                            update={this.updateCanLoginState}
                            ref={(ref) => { this.state.inputs[1] = ref; }}
                        />
                    </Form>

                    <Button
                        rounded
                        bordered    
                        activeOpacity={0.5}
                        onPress={this.login} //-----------该属性需要保留！-------------
                        style={base.button}
                        clear={this.clearAllInputs}>
                        <Image
                            source={require('../src/img/startgame.png')}
                            style={{ height: '250%', width:'250%', marginTop:9 }}
                        />
                    </Button>

                    <View style={base.underline}>
                        <Button
                            transparent
                            activeOpacity={0.5}
                            onPress={this.forgetPW} //-----------该属性需要保留！-------------
                            style={[base.text,{width: 160}]}>
                            <Image
                                source={require('../src/img/forget.png')}
                                style={{height: '150%', width:'150%',}}
                            />
                        </Button>

                        <Button
                            transparent
                            activeOpacity={0.5}
                            onPress={this.gotoRegister} //-----------该属性需要保留！-------------
                            style={[base.text,{width: 200}]}>
                            <Image
                                source={require('../src/img/register.png')}
                                style={{height: '150%', width:'150%',}}
                            />
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 120,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#FF4500',
        marginTop: 10,
        marginBottom: 10,
    },
})