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

const const_Room = {ID : 114514 , password : 4396}

const url = "http://localhost:8080/EnterRoom";

/* 组件 : EnterRoom_inputID
-- 作用 : 收集用户加入某房间的ID及Password，使其加入房间
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
        
        const _this = this;

        let data = {
            RoomID : this.state.RoomID , 
            password : this.state.password
        }

        let flag = 0;

        axios.post( url , data )
            .then(function (response) {
                // handle success
                console.log(response);
                flag = response.data;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        
        if(flag)
        {
            const { navigate } = this.props.navigation ; 
            navigate('Room',{ id : this.state.RoomID , password : this.state.password , host : false });
        }
        
        if(this.state.RoomID == const_Room.ID)
            if(this.state.password == const_Room.password)
            {
                const { navigate } = this.props.navigation ; 
                navigate('Room',{ id : this.state.RoomID , password : this.state.password , host : false });
            }
            else {
                alert("密码错误！")
            }
        else{
            alert("房间号不存在！")
        }
        
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

                    <View>
                        <View 
                            >
                            <Text
                                >
                                预设房间号：{const_Room.ID}
                            </Text>
                            <Text
                                >
                                预设房间密码：{const_Room.password}
                            </Text>
                        </View>
                    </View>

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

