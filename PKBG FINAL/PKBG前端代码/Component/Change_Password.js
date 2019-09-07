import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image
} from 'react-native';
import { Form, Button, Label, Item, Icon } from 'native-base';
import Email from './InputComponents/Email';
import Password from './InputComponents/Password';
import PasswordRepeat from './InputComponents/PasswordRepeat';
import Name from './InputComponents/Name';
import Telephone from './InputComponents/Telephone';
import OldPassword from './InputComponents/OldPassword';

import base from '../src/style/base';
import header from '../src/style/header';

import axios from 'axios';

/* 组件 : Change_Password
-- 作用 : 收集用户信息，并提交至后端
*/
export default class Change_Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [], //用户名0,密码1,确认密码2,电子邮件地址3,电话号码4
        }
        this.register = this.register.bind(this);
        this.gobackLogin = this.gobackLogin.bind(this);
    }

    changeInputFocus = index => () => {
        if (index < 2) {
            this.state.inputs[index + 1].state.inputRef._root.focus(); // eslint-disable-line
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

        if (!(this.state.inputs[2].state.isCorrect)) {
            alert("两次输入的新密码不一致！");
            return;
        }

        const url = "http://49.234.27.75:2001/user/changepass";

        data = {
            username: _this.props.username,
            oldpass: _this.state.inputs[0].state.value,
            newpass: _this.state.inputs[1].state.value,
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
                alert("修改成功！请使用新密码登录。");
                this.gobackLogin();
                break;
            case 0:
                alert("修改失败！旧密码错误。");
                break;
            case -2:
                alert("服务器异常。");
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
                source={require('../src/img/ppp0.jpg')}>
                <View style={base.container}>

                    <View style={header.container}>
                        <View style={header.header}>
                            <View style={header.Head}>
                                <Icon
                                    name={'md-arrow-round-back'}
                                    size={30}
                                    onPress={this.gobackLogin}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={base.container}>

                        <Form>
                            <OldPassword
                                changeFocus={this.changeInputFocus(0)}
                                update={this.updateCanRegisterState}
                                special
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

                        </Form>

                        <Button
                            rounded
                            bordered    
                            activeOpacity={0.5}
                            onPress={this.register} //-----------该属性需要保留！-------------
                            style={[base.button,{height: 38}]}
                            clear={this.clearAllInputs}>
                            <Image
                                source={require('../src/img/changePass.png')}
                                style={{height: '250%', width:'250%',}}
                            />
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
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
