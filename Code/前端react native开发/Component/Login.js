import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
    Button
} from 'react-native';

export default class Login extends Component {
constructor(props){
    super(props);
    this.state = {
        username : '',  //保存用户名
        password : ''   //保存密码
    }
    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
}


/**
 * 当用户名输入框值改变时，保存改变的值
 * @param  {[type]} newUsername [输入的用户名]
 */
onUsernameChanged(newUsername){
    console.log(newUsername);//运行后可以在输入框随意输入内容并且查看log验证！
    this.setState(
    { username : newUsername }
    );
};

/**
 * 当密码输入框值改变时，保存改变的值
 * @param  {[type]} newUsername [输入的密码]
 */
onPasswordChanged(newPassword){
    console.log(newPassword);//运行后可以在输入框随意输入内容并且查看log验证！
    this.setState(
    { password : newPassword }
    );
};


    render() {
        return (
            <TouchableOpacity  //用可点击的组件作为背景
                activeOpacity={1.0}  //设置背景被点击时的透明度改变值
                style={styles.container}>
                <View
                    style={styles.inputBox}>
                    <TextInput
                        onChangeText={this.onUsernameChanged}
                        style={styles.input}
                        autoCapitalize='none'  //设置首字母不自动大写
                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                        placeholder={'用户名'}  //设置占位符
                    />
                </View>
                <View
                    style={styles.inputBox}>
                    <TextInput
                        onChangeText={this.onPasswordChanged}
                        style={styles.input}
                        autoCapitalize='none'  //设置首字母不自动大写
                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        secureTextEntry={true}  //设置为密码输入框
                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                        placeholder={'密码'}  //设置占位符
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}>
                    <Text
                        style={styles.btText}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}>
                    <Text
                        style={styles.btText}>注册</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}>
                    <Text
                        style={styles.btText}>(测试用) {this.state.password} {this.state.username}</Text>
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
        backgroundColor: '#58812F',
        marginBottom: 8,
    },
    button: {
        height: 50,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#58812F',
        marginTop: 20,
    },
    btText: {
        color: '#fff',
        fontSize: 20,
    }
});