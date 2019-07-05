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

    /**
     * 成功登陆界面
     */
    constructor(props){
        super(props);
        this.state = {
            username : this.props.username
        }
        this.createRoom = this.createRoom.bind(this);
        this.enterRoom = this.enterRoom.bind(this);
        this.exit = this.exit.bind(this);
    }


    createRoom(){
        /*
        const _this = this;
         
        const url = "http://local:8080/createRoom";

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
        */
        const { navigate } = this.props.navigation;

        navigate('Room',{id :"777",password : "123"});
    }

    /* 退出登录 */
    exit(){
        const { goBack } = this.props.navigation ;
        goBack();
    }

    enterRoom(){
        const { navigate } = this.props.navigation ;
        navigate('EnterRoom_inputID');  
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

