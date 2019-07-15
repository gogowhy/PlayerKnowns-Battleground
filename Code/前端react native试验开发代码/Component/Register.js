import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    ImageBackground
} from 'react-native';
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

class CheckOut extends Component {
    
    render(){
        /** 定义了合法email和phone的正则表达式 用于输入合法性的检测 */
        var expr_email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;;
        var expr_phone = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        
        /** 检测密码、邮箱、手机号 */
        var pw = !this.props.pw1.indexOf(this.props.pw2); //密码检测 ， true则表示格式正确 、不显示在屏幕上 ， 下同
        var em = expr_email.test(this.props.email) || (this.props.email === ""); //邮箱检测
        var ph = expr_phone.test(this.props.phone) || (this.props.phone === ""); //手机号检测

        var password_line = pw ? "" : "!两次密码不一致" ;
        var email_line = em ? "" : "!邮箱地址不合法" ;
        var phone_line = ph ? "" : "!手机号格式不合法" ;
        

        return(
            <View>
                <TouchableOpacity
                        style={styles.CheckOut}>
                        <Text
                            style={styles.CheckOutInfo}> {password_line}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style={styles.CheckOut}>
                        <Text
                            style={styles.CheckOutInfo}>{email_line}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style={styles.CheckOut}>
                        <Text
                            style={styles.CheckOutInfo}>{phone_line}</Text>
                </TouchableOpacity>
            </View>
        )

    }
}

/* 组件 : Register
-- 作用 : 收集用户信息，并提交至后端
*/
export default class Register extends Component {
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
        this.gobackLogin = this.gobackLogin.bind(this);
    }
    /** 收集文本框内输入的用户信息 更改state 下同 */
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
    /* 以上是修改state(用户名、密码等) */

    /**
     * 功能 ： 注册
     * 触发 ： 点击“注册”按钮
     * 
     * 注册一个帐户
     */
async   register(){
        const _this = this;

        /** 定义了合法email和phone的正则表达式 用于输入合法性的检测 */
        var expr_email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;;
        var expr_phone = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        
        /** 检测密码、邮箱、手机号 */
        var pw = !this.state.password.indexOf(this.state.confirmpassword) && !(this.state.password ==""); //密码检测 ， true则表示格式正确 、不显示在屏幕上 ， 下同
        var em = expr_email.test(this.state.email); //邮箱检测
        var ph = expr_phone.test(this.state.telephone); //手机号检测
        
        if(!(pw && em && ph)){
            alert("个人信息格式不对！");
            return;
        }

        const url = "http://49.234.27.75:2001/user/register";
        
        data = {
            username : _this.state.username,
            userpassword : _this.state.password,
            useremail : _this.state.email,
            usertele : _this.state.telephone
        }
        
        var code = -1;
    await    axios.post( url , data )
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
        
        switch(code){
            case 1:
                alert("注册成功！欢迎新用户"+data.username);
                this.gobackLogin();
                break;
            case 0:
                alert("注册失败！用户名"+data.username+"重复。");
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
    gobackLogin(){
        const { goBack } = this.props.navigation ;
        goBack();
    }


    render() {

        return (
            <ImageBackground style={base.background}
                source={require('../src/img/bg1.png')}>
                <TouchableOpacity
                    activeOpacity={1.0}  //设置背景被点击时，透明度不变
                    style={base.container}>
                    <TouchableOpacity
                        style={header.Head}>
                        <Ionicons 
                            name = {'md-arrow-round-back'} 
                            size={30}
                            onPress = {this.gobackLogin}
                        />
                    </TouchableOpacity>
                    <View style={base.container}>
                        <View style={styles.container_rev}>
                            <CheckOut pw1='' pw2='' email='' phone='' />
                            <View style={base.container}>
                                <View
                                    style={base.inputBox}>
                                    <TextInput
                                        style={base.input}
                                        name="username"
                                        onChangeText = {this.onUsernameChanged} //-----------该属性需要保留！-------------
                                        autoCapitalize='none'  //设置首字母不自动大写
                                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                                        placeholder={'用户名'}  //设置占位符
                                    />
                                </View>
                                <View
                                    style={base.inputBox}>
                                    <TextInput
                                        style={base.input}
                                        name="password"
                                        onChangeText = {this.onPasswordChanged} //-----------该属性需要保留！-------------
                                        secureTextEntry={true}  //设置为密码输入框
                                        autoCapitalize='none'  //设置首字母不自动大写
                                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                                        placeholder={'密码'}  //设置占位符
                                    />
                                </View>
                                <View
                                    style={base.inputBox}>
                                    <TextInput
                                        style={base.input}
                                        name="confirmpassword"
                                        onChangeText = {this.onConfirmPasswordChanged} //-----------该属性需要保留！-------------
                                        secureTextEntry={true}  //设置为密码输入框
                                        autoCapitalize='none'  //设置首字母不自动大写
                                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                                        placeholder={'确认密码'}  //设置占位符
                                    />
                                </View>
                                <View
                                    style={base.inputBox}>
                                    <TextInput
                                        style={base.input}
                                        name="email"
                                        onChangeText = {this.onEmailChanged} //-----------该属性需要保留！-------------
                                        autoCapitalize='none'  //设置首字母不自动大写
                                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                                        placeholder={'电子邮箱'}  //设置占位符
                                    />
                                </View>
                                <View
                                    style={base.inputBox}>
                                    <TextInput
                                        style={base.input}
                                        name="telephone"
                                        onChangeText = {this.onTelephoneChanged} //-----------该属性需要保留！-------------
                                        autoCapitalize='none'  //设置首字母不自动大写
                                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                                        placeholder={'电话号码'}  //设置占位符
                                    />
                                </View>
                            </View>
                            <CheckOut pw1={this.state.password} pw2={this.state.confirmpassword} email={this.state.email} phone={this.state.telephone} />
                        </View>
                        <TouchableOpacity
                            onPress = {this.register} //-----------该属性需要保留！-------------
                            style={base.button}>
                            <Text
                                style={base.btText}>注册</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container_rev: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    CheckOut: {
        flexDirection: 'row',
        height: 40,
        width: 180,
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
    }
});
