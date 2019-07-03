import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert
} from 'react-native';

import axios from 'axios';
import { ensureExpectedIsNonNegativeInteger } from 'jest-matcher-utils';


class CheckOut extends Comment {
    constructor(props){
        super(props);
        this.state = {
            pw : true,
            em : true,
            ph : true
        }
    }
    
    componentDidMount(){
        var expr_email = /^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;
        var expr_phone = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        this.setState({
            pw : !this.props.pw1.indexOf(this.props.pw2),
            em : expr_email.test(this.props.email),
            ph : expr_phone.test(this.props.phone)
        })
    }
    render(){

        var rows=[];
        if(!pw)
        rows.push(
            <TouchableOpacity
                    style={styles.button}>
                    <Text
                        style={styles.btText}>两次密码不一致</Text>
                </TouchableOpacity>
        )
        
        if(!em)
        rows.push(
            <TouchableOpacity
                    style={styles.button}>
                    <Text
                        style={styles.btText}>邮箱地址不合法</Text>
                </TouchableOpacity>
        )

        if(!ph)
        rows.push(
            <TouchableOpacity
                    style={styles.button}>
                    <Text
                        style={styles.btText}>手机号不合法</Text>
                </TouchableOpacity>
        )

        return(
            <View>{rows}</View>
        )

    }
}

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '', //用户名
            password : '', //密码
            confirmpassword : '', //确认密码
            email : '',    //电子邮件地址
            telephone : '' //电话号码
        }
        this.onUsernameChanged = this.onUsernameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.onConfirmPasswordChanged = this.onConfirmPasswordChanged.bind(this);
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onTelephoneChanged = this.onTelephoneChanged.bind(this);
        this.register = this.register.bind(this);
    }

    onUsernameChanged( n ){
        this.setState(
            { username : n }
        )
    }
    
    onPasswordChanged( n ){
        this.setState(
            { password : n }
        )
    }

    onConfirmPasswordChanged( n ){
        this.setState(
            { confirmpassword : n }
        )
    }

    onEmailChanged( n ){
        this.setState(
            { email : n }
        )
    }

    onTelephoneChanged( n ){
        this.setState(
            { telephone : n }
        )
    }

    register(){
        const _this = this;

        const url = "http://local:8080/Register";
        
        data = {
            username : _this.state.username,
            password : _this.state.password,
            confirmpassword : _this.state.confirmpassword,
            email : _this.state.email,
            telephone : _this.state.telephone
        }
        axios.post( url , data )
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    render() {

        var B = !this.state.password.indexOf(this.state.confirmpassword) ? "" : "两次密码不一致";

        

        return (
            <TouchableOpacity
                activeOpacity={1.0}  //设置背景被点击时，透明度不变
                style={styles.container}>
                <View
                    style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        name="username"
                        onChangeText = {this.onUsernameChanged}
                        autoCapitalize='none'  //设置首字母不自动大写
                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                        placeholder={'用户名'}  //设置占位符
                    />
                </View>
                <View
                    style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        name="password"
                        onChangeText = {this.onPasswordChanged}
                        secureTextEntry={true}  //设置为密码输入框
                        autoCapitalize='none'  //设置首字母不自动大写
                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                        placeholder={'密码'}  //设置占位符
                    />
                </View>
                <View
                    style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        name="confirmpassword"
                        onChangeText = {this.onConfirmPasswordChanged}
                        secureTextEntry={true}  //设置为密码输入框
                        autoCapitalize='none'  //设置首字母不自动大写
                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                        placeholder={'确认密码'}  //设置占位符
                    />
                </View>
                <View
                    style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        name="email"
                        onChangeText = {this.onEmailChanged}
                        autoCapitalize='none'  //设置首字母不自动大写
                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                        placeholder={'电子邮箱'}  //设置占位符
                    />
                </View>
                <View
                    style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        name="telephone"
                        onChangeText = {this.onTelephoneChanged}
                        secureTextEntry={true}  //设置为密码输入框
                        autoCapitalize='none'  //设置首字母不自动大写
                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                        placeholder={'电话号码'}  //设置占位符
                    />
                </View>
                <TouchableOpacity onPress = {this.register}
                    style={styles.button}>
                    <Text
                        style={styles.btText}>注册</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress = {this.register}
                    style={styles.button}>
                    <Text
                        style={styles.btText}>{B}</Text>
                </TouchableOpacity>
                <CheckOut pw1={this.state.password} pw2={this.state.confirmpassword} email={this.state.email} phone={this.state.telephone} />
            </TouchableOpacity>
        );
    }


}

export default class RegisterScene extends Component {
    render() {
        return (
            <Register />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input: {
        width: 200,
        height: 40,
        fontSize: 20,
        color: '#fff',//输入框输入的文本为白色
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#66f',
        marginBottom: 8,
    },
    button: {
        height: 50,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#66f',
        marginTop: 20,
    },
    btText: {
        color: '#fff',
        fontSize: 20,
    }
});
