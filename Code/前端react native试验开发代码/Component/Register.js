import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground
} from 'react-native';
import { Form, Button, Label, Item } from 'native-base';
import Email from './InputComponents/Email';
import Password from './InputComponents/Password';
import PasswordRepeat from './InputComponents/PasswordRepeat';
import Name from './InputComponents/Name';
import Telephone from './InputComponents/Telephone';

import base from '../src/style/base';
import header from '../src/style/header';
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from 'axios';

/* 组件 : CheckOut
-- 作用 : 在前端检测各项填写规范
   具体检测内容 : 1.两次密码是否一致
                 2.邮箱格式
                 3.手机号格式
*/
class CheckEmail extends Component {

    render() {

        /** 定义了合法phone的正则表达式 用于输入合法性的检测 */
        var expr_email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

        /** 检测邮箱 true则表示格式正确 、不显示在屏幕上  */
        var email_line = "";
        if (expr_email.test(this.props.email) || (this.props.email === "")) {
            email_line = "邮箱地址不合法";
        } else return null;

        return (
            <Item style={styles.CheckOut}>
                <Label style={styles.CheckOutInfo}>{email_line}</Label>
            </Item>
        )
    }
}

class CheckTele extends Component {

    render() {

        /** 定义了合法phone的正则表达式 用于输入合法性的检测 */
        var expr_phone = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;

        /** 检测手机号 true则表示格式正确 、不显示在屏幕上 */
        var phone_line = "";
        if (expr_phone.test(this.props.phone) || (this.props.phone === "")) {
            phone_line = "手机号格式不合法";
        } else return null;

        return (
            <Item style={styles.CheckOut}>
                <Label style={styles.CheckOutInfo}>{phone_line}</Label>
            </Item>
        )
    }
}

class CheckPass extends Component {
    render() {

        /** 检测密码 true则表示格式正确 、不显示在屏幕上 */
        var pass_line = "";
        if (this.props.repeat !== this.props.pass && this.props.pass !== '') {
            if (this.props.repeat !== '') {
                pass_line = "两次密码不一致";
            }
        } else return null;

        return (
            <Item style={styles.CheckOut}>
                <Label style={styles.CheckOutInfo}>{pass_line}</Label>
            </Item>
        )
    }
}

/* 组件 : Register
-- 作用 : 收集用户信息，并提交至后端
*/
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // username : '', //用户名0
            // password : '', //密码1
            // confirmpassword : '', //确认密码2
            // email : '',    //电子邮件地址3
            // telephone : '', //电话号码4
            inputs: [],
        }
        // this.onUsernameChanged = this.onUsernameChanged.bind(this);
        // this.onPasswordChanged = this.onPasswordChanged.bind(this);
        // this.onConfirmPasswordChanged = this.onConfirmPasswordChanged.bind(this);
        // this.onEmailChanged = this.onEmailChanged.bind(this);
        // this.onTelephoneChanged = this.onTelephoneChanged.bind(this);
        this.register = this.register.bind(this);
        this.gobackLogin = this.gobackLogin.bind(this);
    }
    /** 收集文本框内输入的用户信息 更改state 下同 */
    // onUsernameChanged( n ){
    //     this.setState(
    //         { username : n }
    //     )
    // }

    // onPasswordChanged( n ){
    //     this.setState(
    //         { password : n }
    //     )
    // }

    // onConfirmPasswordChanged( n ){
    //     this.setState(
    //         { confirmpassword : n }
    //     )
    // }

    // onEmailChanged( n ){
    //     this.setState(
    //         { email : n }
    //     )
    // }

    // onTelephoneChanged( n ){
    //     this.setState(
    //         { telephone : n }
    //     )
    // }
    // /* 以上是修改state(用户名、密码等) */

    changeInputFocus = index => () => {
        if (index < 4) {
            this.state.inputs[index + 1].state.inputRef._root.focus(); // eslint-disable-line
            // if (index >= 1) {
            //     this.props.scroll(index);
            // }
        }
    };

    updateCanRegisterState = () => {
        const pass = this.state.inputs[1].state.value;
        const repeat = this.state.inputs[2].state.value;

        if (repeat !== pass) {
            if (repeat !== '') {
                this.state.inputs[2].state.isCorrect = 2;
                this.state.inputs[2].forceUpdate();
            }
        } else if (pass !== '') {
            this.state.inputs[2].state.isCorrect = 1;
            this.state.inputs[2].forceUpdate();
        }

        let canRegister = true;
        this.state.inputs.forEach((child) => {
            if (child.state.isCorrect !== 1) {
                canRegister = false;
            }
        });
    };

    clearAllInputs = () => {
        this.state.inputs.forEach(child => child.clearInput());
    };

    /**
     * 功能 ： 注册
     * 触发 ： 点击“注册”按钮
     * 
     * 注册一个帐户
     */
    async   register() {
        const _this = this;

        if (!(this.state.inputs[2].state.isCorrect && this.state.inputs[3].state.isCorrect && this.state.inputs[4].state.isCorrect)) {
            alert("个人信息格式不对！");
            return;
        }

        const url = "http://49.234.27.75:2001/user/register";

        data = {
            username: _this.state.inputs[0].state.value,
            userpassword: _this.state.inputs[1].state.value,
            useremail: _this.state.inputs[3].state.value,
            usertele: _this.state.inputs[4].state.value,
        }

        var code = -1;
        await axios.post(url, data)
            .then(function (res) {
                // handle success
                code = res.data;
                console.log(res);
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
            case 1:
                alert("注册成功！欢迎新用户" + data.username);
                this.gobackLogin();
                break;
            case 0:
                alert("注册失败！用户名" + data.username + "重复。");
                break;
            case -2:
                alert("出错了！请稍后再试。");
                break;
            case -1:
                alert("未响应。");
                break;
        }

        /*
                var str = this.state.username;
                fetch( "http://49.234.27.75:3101/test")
                    .then(function (response) {
                        // handle success
                        //code = res.data;
                        str = response.text();
                        console.log(response);
                    })
        
                alert(str);
                */
    }
    /** 返回上一个页面（登录页面） */
    gobackLogin() {
        const { goBack } = this.props.navigation;
        goBack();
    }


    render() {

        return (
            <ImageBackground style={base.background}
                source={require('../src/img/bg1.png')}>
                <View style={base.container}>

                    <View style={header.container}>
                        <View style={header.header}>
                            <View style={header.Head}>
                                <Ionicons
                                    name={'md-arrow-round-back'}
                                    size={30}
                                    onPress={this.gobackLogin}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={base.container}>

                        <Form>
                            <Name
                                changeFocus={this.changeInputFocus(0)}
                                update={this.updateCanRegisterState}
                                ref={(ref) => { this.state.inputs[0] = ref; }}
                            />

                            <Password
                                changeFocus={this.changeInputFocus(1)}
                                update={this.updateCanRegisterState}
                                special
                                ref={(ref) => { this.state.inputs[1] = ref; }}
                            />

                            <PasswordRepeat
                                changeFocus={this.changeInputFocus(2)}
                                update={this.updateCanRegisterState}
                                ref={(ref) => { this.state.inputs[2] = ref; }}
                            />
                            {/* <CheckPass pass={this.state.inputs[1].state.value} repeat={this.state.inputs[2].state.value} /> */}
                            <Email
                                changeFocus={this.changeInputFocus(3)}
                                update={this.updateCanRegisterState}
                                ref={(ref) => { this.state.inputs[3] = ref; }}
                            />
                            {/* <CheckEmail email={this.state.inputs[3].state.value} /> */}
                            <Telephone
                                changeFocus={this.changeInputFocus(4)}
                                update={this.updateCanRegisterState}
                                ref={(ref) => { this.state.inputs[4] = ref; }}
                            />
                            {/* <CheckTele phone={this.state.inputs[4].state.value} /> */}
                        </Form>

                        <Button
                            rounded
                            activeOpacity={0.5}
                            onPress={this.register} //-----------该属性需要保留！-------------
                            style={styles.button}
                            clear={this.clearAllInputs}>
                            <Text style={base.btText}>注 册</Text>
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    // container_rev: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'flex-end',
    // },
    CheckOut: {
        flexDirection: 'row',
        height: 40,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'transparent',
        marginBottom: 4,
    },
    CheckOutInfo: {
        color: '#FF4500',
        fontSize: 15,
        //marginBottom: 4,
    },
    button: {
        height: 40,
        width: 120,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 18,
        backgroundColor: '#FF4500',
        marginTop: 5,
        marginBottom: 10,
    },
});
