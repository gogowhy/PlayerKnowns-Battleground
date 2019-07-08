import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import base from '../src/style/base';
import header from '../src/style/header';
import Ionicons from "react-native-vector-icons/Ionicons";

import axios from 'axios';

export default class MainPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username : this.props.navigation.state.params.username
        }
        this.createRoom = this.createRoom.bind(this);
        this.enterRoom = this.enterRoom.bind(this);
        this.exit = this.exit.bind(this);
    }

    
    /* 退出登录 */
    exit(){
        const { goBack } = this.props.navigation ;
        goBack();
    }

    /**
     * 功能 ：创建房间
     * 触发 ：点击“创建房间”按钮
     * 
     * 系统会自动创建一个包含明文房间ID和密码的房间，并将 roomID 和 password 返回至前端
     * 随后跳转至房间
     */
    createRoom(){
        
        const _this = this;
         
        const url = "http://local:8080/createRoom";

        let roomID = "";
        let password = "";

        data = {
            username : _this.state.username,
        }
        axios.post( url , data )
            .then(function (response) {
                // handle success
                roomID = response.data.roomID;
                password = response.data.password;
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        
        const { navigate } = this.props.navigation;

        //被注释掉的这句是实际上从后端获取信息后跳转的语句 未被注释掉的是测试语句
        //navigate('Room',{roomID : roomID , password : password , host : true , username :this.state.username });
        navigate('Room',{roomID :"114514" , password : "4396" , host : true , username :this.state.username });
    }

    /** 
     * 功能 ：加入房间
     * 触发 ：点击“加入房间”按钮
     * 
     * 跳转到一个输入 房间ID 和 密码 的页面（EnterRoom_inputID.js)
     * 
     */
    enterRoom(){
        const { navigate } = this.props.navigation ;
        navigate('EnterRoom_inputID',{username : this.state.username});  
    }

    render() {
        return (
            <ImageBackground style={base.background}
                source={require('../src/img/bg1.png')}>
                <TouchableOpacity
                    activeOpacity={1.0}  //设置背景被点击时，透明度不变
                    style={base.container}>
                    <View 
                        style={header.Head}>
                        <Ionicons 
                            name = {'md-exit'} 
                            size={30}
                            onPress = {this.exit}
                        />
                    </View>
                    <TouchableOpacity
                        style={base.container}>
                        <TouchableOpacity
                            onPress = {this.createRoom} //-----------该属性需要保留！-------------
                            style={base.button}>
                            <Text
                                style={base.btText}>创建房间</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress = {this.enterRoom} //-----------该属性需要保留！-------------
                            style={base.button}>
                            <Text
                                style={base.btText}>加入房间</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

}

