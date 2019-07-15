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
import Entypo from "react-native-vector-icons/Entypo";
import axios from 'axios';

/** 测试用房间ID和房间密码 */
const const_Room = {ID : 114514 , password : 4396}

/** 定义了同后端传递和接收指令的 Code 用来处理不同种类的 登录的响应状态 */
const ROOMID = 1 , PASSWORD = 2;

/* 组件 : EnterRoom_inputID
-- 作用 : 收集用户加入某房间的ID及Password，使其加入房间
*/
export default class EnterRoom_inputID extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomID : '', //房间ID
            password : '', //密码
            username : this.props.navigation.state.params.username
        }
        this.onRoomIDChanged = this.onRoomIDChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.enterRoom = this.enterRoom.bind(this);
        this.gobackMainPage = this.gobackMainPage.bind(this);
    }

    /* 修改state(房间ID、密码等) 下同 */
    onRoomIDChanged( n ){
        this.setState(
            { roomID : n }
        )
    }

    onPasswordChanged( n ){
        this.setState(
            { password : n }
        )
    }
    /* 以上是修改state(房间ID、密码等) */

    /**
     * 功能 ：进入房间
     * 触发 ：点击“进入房间”按钮
     * 
     * 传递已输入的 房间ID 和 密码 ，并返回是否成功进入的状态
     */
async    enterRoom(){
        
        const _this = this;

        const url = "http://49.234.27.75:2002/room/join";

        let data = {
            roomID : this.state.roomID , 
            password : this.state.password ,
            username : this.state.username
        }

        var code = -1;

    await    axios.post( url , data )
            .then(function (response) {
                // handle success
                console.log(response);
                code = response.data;
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
                //成功登录，跳转页面
                case 0 : const { navigate } = this.props.navigation ; 
                navigate('Room',{ roomID : this.state.roomID , password : this.state.password , host : false , username :this.state.username });break;
                // ROOMID即房间号不存在，在该文件 EnterRoom_inputID.js 顶部已定义
                case ROOMID : alert("房间号不存在！");break;
                // PASSWORD即密码错误，在该文件 EnterRoom_inputID.js 顶部已定义
                case PASSWORD : alert("密码错误！");break;

                case 3 : alert("房间已在游戏中！");break;

                case 4 : alert("房间人数已满。");break;
                // 服务器端发生错误
                case -2 : alert("服务器出错！");break;
                default : alert("未连接！");break;
            }
        
        
        /** 以下为测试语句 
        if(this.state.roomID == const_Room.ID)
            if(this.state.password == const_Room.password)
            {
                const { navigate } = this.props.navigation ; 
                navigate('Room',{ roomID : this.state.roomID , password : this.state.password , host : false , username :this.state.username });
            }
            else {
                alert("密码错误！")
            }
        else{
            alert("房间号不存在！")
        }
        /** 以上为测试语句 */
    }

    /** 放回上一级页面(MainPage.js) */
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
                    <View style={header.container}>
                        <View style={header.header}>
                            <View style={header.Head}>
                                <Ionicons
                                    name = {'md-exit'} 
                                    size = {30}
                                    onPress = {this.gobackMainPage}
                                />
                            </View>
                            <View style={header.End}>
                                <Entypo
                                    name = {'help-with-circle'}
                                    size = {28}
                                    onPress = {this.help}
                                />
                            </View>
                        </View>
                    </View>

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
                                name="roomID"
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

