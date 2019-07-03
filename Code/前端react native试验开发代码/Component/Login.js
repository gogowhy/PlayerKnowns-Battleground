import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text
} from 'react-native';

import axios from 'axios';

/* 组件 : Login
-- 作用 : 收集用户登录信息，并提交至后端
*/
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '', //用户名
            password : '', //密码
        }
        this.onUsernameChanged = this.onUsernameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.forgetPW = this.forgetPW.bind(this);
        this.login = this.login.bind(this);
        this.gotoRegister = this.gotoRegister.bind(this);
    }
    
    /* 修改state(用户名、密码等) 下同 */
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
    /* 以上是修改state(用户名、密码等) */
    
    /* 登录 ： 向后端发送用户名和密码 */
    login(){
        const _this = this;

        const url = "http://local:8080/Login";
        
        data = {
            username : _this.state.username,
            password : _this.state.password,
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


    /* 忘记密码 ： 向后端发送用户名，根据此用户名绑定的邮箱账号发送邮件重置密码 */
    forgetPW(){
        const _this = this;

        const url = "http://local:8080/forgetPassword";

        data = {
            username : _this.state.username,
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

    gotoRegister(){
        const { navigate } = this.props.navigation ; 
        navigate('Register');
    }

    render() {

        return (
            <TouchableOpacity
                activeOpacity={1.0}  //设置背景被点击时，透明度不变
                style={styles.container}>
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
                <TouchableOpacity 
                    onPress = {this.login} //-----------该属性需要保留！-------------
                    style={styles.button}>
                    <Text
                        style={styles.btText}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress = {this.forgetPW} //-----------该属性需要保留！-------------
                    style={styles.button}>
                    <Text
                        style={styles.btText}>忘记密码</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress = {this.gotoRegister} //-----------该属性需要保留！-------------
                    style={styles.button}>
                    <Text
                        style={styles.btText}>没有账号?去注册</Text>
                </TouchableOpacity>
            </TouchableOpacity>
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
