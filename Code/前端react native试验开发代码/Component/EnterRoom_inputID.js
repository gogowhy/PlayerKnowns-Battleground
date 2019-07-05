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



/* 组件 : Login
-- 作用 : 收集用户登录信息，并提交至后端
*/
export default class EnterRoom_inputID extends Component {
    constructor(props){
        super(props);
        this.state = {
            RoomID : '', //房间ID
            password : '', //密码
        }
        this.onRoomIDChanged = this.onRoomIDChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.enterRoom = this.enterRoom.bind(this);
        this.gobackMainPage = this.gobackMainPage.bind(this);
    }

    /* 修改state(房间ID、密码等) 下同 */
    onRoomIDChanged( n ){
        this.setState(
            { RoomID : n }
        )
    }

    onPasswordChanged( n ){
        this.setState(
            { password : n }
        )
    }
    /* 以上是修改state(房间ID、密码等) */

    /* 登录 ： 向后端发送房间ID和密码 */
    enterRoom(){
        const { navigate } = this.props.navigation ; 
        navigate('Room',{ id : this.state.RoomID , password : this.state.password });
        /*
        const _this = this;

        const url = "http://local:8080/Login";

        data = {
            RoomID : _this.state.RoomID,
            userpassword : _this.state.password,
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
        */
    }

    gobackMainPage(){
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
                            onPress = {this.gobackMainPage}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={base.container}>
                        <View
                            style={base.inputBox}>
                            <TextInput
                                style={base.input}
                                name="RoomID"
                                onChangeText = {this.onRoomIDChanged} //-----------该属性需要保留！-------------
                                autoCapitalize='none'  //设置首字母不自动大写
                                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                                placeholderTextColor={'#ccc'}  //设置占位符颜色
                                placeholder={'房间ID'}  //设置占位符
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
                        <TouchableOpacity
                            onPress = {this.enterRoom} //-----------该属性需要保留！-------------
                            style={base.button}>
                            <Text
                                style={base.btText}>进入房间</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

