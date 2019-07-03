import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    ImageBackground
} from 'react-native';

import axios from 'axios';

/* 组件 : CheckOut
-- 作用 : 在前端检测各项填写规范
   具体检测内容 : 1.两次密码是否一致
                 2.邮箱格式
                 3.手机号格式
*/
class CheckOut extends Component {
    /*
    constructor(props){
        super(props);
        this.state = {
            pw : true, //密码提示 ， true则表示格式正确 ， 不显示在屏幕上 ， 下同
            em : true, //邮箱提示
            ph : true, //手机号提示
        }
    }
    
    componentDidMount(){
        var expr_email = /^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;
        var expr_phone = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        this.setState({
            pw : !this.props.pw1.indexOf(this.props.pw2), //检测密码
            em : expr_email.test(this.props.email) || (this.props.email === ""), //检测邮箱
            ph : expr_phone.test(this.props.phone) || (this.props.phone === "") //检测手机号
        })
    }
    */
    render(){

        var expr_email = /^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;
        var expr_phone = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        
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

    /* 注册 ： 向后端发送注册信息 */
    register(){
        const _this = this;

        const url = "http://local:8080/mydb/Register";
        
        data = {
            username : _this.state.username,
            userpassword : _this.state.password,
            useremail : _this.state.email,
            usertele : _this.state.telephone
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

    /* 返回登录界面 */
    gobackLogin(){
        const { goBack } = this.props.navigation ;
        goBack();
    }


    render() {

        return (
            <ImageBackground style={styles.background}
                source={require('../src/img/bg1.png')}>
                <TouchableOpacity
                    activeOpacity={1.0}  //设置背景被点击时，透明度不变
                    style={styles.container}>
                    <View style={styles.container}>
                        <View style={styles.container_rev}>
                            <CheckOut pw1='' pw2='' email='' phone='' />
                            <View style={styles.container}>
                                <View
                                    style={styles.inputBox}>
                                    <TextInput
                                        style={styles.input}
                                        name="username"
                                        onChangeText = {this.onUsernameChanged} //-----------该属性需要保留！-------------
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
                                        onChangeText = {this.onPasswordChanged} //-----------该属性需要保留！-------------
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
                                        onChangeText = {this.onConfirmPasswordChanged} //-----------该属性需要保留！-------------
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
                                        onChangeText = {this.onEmailChanged} //-----------该属性需要保留！-------------
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
                            style={styles.button}>
                            <Text
                                style={styles.btText}>注册</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {this.gobackLogin} //-----------该属性需要保留！-------------
                            style={styles.underline}>
                            <Text
                                style={styles.ulText}>返回登录</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    container_rev: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: null,
        width: null,
        zIndex: -1,
    },
    input: {
        width: 180,
        height: 50,
        fontSize: 18,
        color: '#000',//输入框输入的文本为黑色
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#FFFFF0',
        marginBottom: 8,
    },
    button: {
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FF4500',
        marginTop: 10,
        marginBottom: 10,
    },
    btText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
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
    },
    underline: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    ulText: {
        textDecorationLine:'underline',
        color: '#0000CD',
        fontWeight: 'bold',
        fontSize: 18,
    }
});
