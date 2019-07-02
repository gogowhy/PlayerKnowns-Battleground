import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    TextInput,
    Text,
    Alert
} from 'react-native';
export default class RegisterScene extends Component {

constructor(props){
    super(props);
    this.state = {
        username : '',  //保存用户名
        password : '',  //保存密码
        confirmpassword : '' //保存确认密码
    }
    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onConfirmpasswordChanged = this.onConfirmpasswordChanged.bind(this);
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
 * @param  {[type]} newPassword [输入的密码]
 */
onPasswordChanged(newPassword){
    console.log(newPassword);//运行后可以在输入框随意输入内容并且查看log验证！
    this.setState(
    { password : newPassword }
    );
};

/**
 * 当确认密码输入框值改变时，保存改变的值
 * @param  {[type]} newConfirmPassword [输入的确认密码]
 */
onConfirmpasswordChanged(newConfirmPassword){
    console.log(newConfirmPassword);//运行后可以在输入框随意输入内容并且查看log验证！
    this.setState(
    { confirmpassword : newConfirmPassword }
    );
};

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1.0}  //设置背景被点击时，透明度不变
                style={styles.container}>
                <View
                    style={styles.inputBox}>
                    <TextInput
                        onChangeText = {this.onUsernameChanged}
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
                        onChangeText = {this.onPasswordChanged}
                        style={styles.input}
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
                        onChangeText = {this.onConfirmpasswordChanged}
                        style={styles.input}
                        secureTextEntry={true}  //设置为密码输入框
                        autoCapitalize='none'  //设置首字母不自动大写
                        underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        placeholderTextColor={'#ccc'}  //设置占位符颜色
                        placeholder={'确认密码'}  //设置占位符
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}>
                    <Text
                        style={styles.btText}>注册</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}>
                    <Text
                        style={styles.btText}>(测试用) {this.state.confirmpassword} {this.state.password} {this.state.username}</Text>
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