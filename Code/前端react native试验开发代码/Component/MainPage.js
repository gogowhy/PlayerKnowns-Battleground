import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { Icon, Button } from 'native-base';
import base from '../src/style/base';
import header from '../src/style/header';

//import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";

import axios from 'axios';

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.navigation.state.params.username
        }
        this.createRoom = this.createRoom.bind(this);
        this.enterRoom = this.enterRoom.bind(this);
        this.exit = this.exit.bind(this);
        this.warehouse = this.warehouse.bind(this);
        this.shop = this.shop.bind(this);
        this.settings = this.settings.bind(this);
        this.help = this.help.bind(this);
    }

    /* 退出登录 */
    exit() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    /**
     * 功能 ：创建房间
     * 触发 ：点击“创建房间”按钮
     * 
     * 系统会自动创建一个包含明文房间ID和密码的房间，并将 roomID 和 password 返回至前端
     * 随后跳转至房间
     */
    async    createRoom() {

        const _this = this;

        const url = "http://49.234.27.75:2002/room/create";

        data = {
            username: _this.state.username,
        }

        var roomID;
        var password;
        var code = -1;
        await axios.post(url, data)
            .then(function (response) {
                // handle success
                code = response.data.code;
                roomID = response.data.roomnumber;
                password = response.data.roompassword;
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                code = -2;
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        switch (code) {
            case 0: const { navigate } = this.props.navigation;
                navigate('Room', { roomID: roomID, password: password, host: true, username: this.state.username });
                break;
            case 1: alert("创建失败!服务器异常。"); break;
            case -2: alert("服务器异常。"); break;
            default: alert("未响应！"); break;
        }


        //被注释掉的这句是实际上从后端获取信息后跳转的语句 未被注释掉的是测试语句
        //const { navigate } = this.props.navigation;
        //navigate('Room',{roomID :"114514" , password : "4396" , host : true , username :this.state.username });
    }

    /** 
     * 功能 ：加入房间
     * 触发 ：点击“加入房间”按钮
     * 
     * 跳转到一个输入 房间ID 和 密码 的页面（EnterRoom_inputID.js)
     * 
     */
    enterRoom() {
        const { navigate } = this.props.navigation;
        navigate('EnterRoom_inputID', { username: this.state.username });
    }

    /** 
     * 功能 ：进入仓库
     * 触发 ：点击“warehouse”图标
     * 
     * 跳转到仓库页面（...js)
     * 
     */
    warehouse() {

    }

    /** 
     * 功能 ：进入商店
     * 触发 ：点击“shop”图标
     * 
     * 跳转到商店页面（...js)
     * 
     */
    shop() {

    }

    settings() {

    }

    help() {

    }

    render() {
        return (
            <ImageBackground style={base.background}
                source={require('../src/img/bg1.png')}>
                <TouchableOpacity
                    activeOpacity={1.0}  //设置背景被点击时，透明度不变
                    style={{ flex: 1 }}>
                    <View style={header.container}>
                        <View style={header.header}>
                            <View style={header.Head}>
                                <Icon
                                    name={'md-exit'}
                                    onPress={this.exit}
                                />
                            </View>
                            <View style={header.End}>
                                <Icon
                                    name={'md-settings'}
                                    onPress={this.settings}
                                    style={{ marginRight: 6 }}
                                />
                                <Entypo
                                    name={'help-with-circle'}
                                    size={26}
                                    color={'black'}
                                    onPress={this.help}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={styles.containerRow}>
                            <FontAwesome5
                                style={{ marginRight: 10 }}
                                name={'warehouse'}
                                size={40}
                                onPress={this.warehouse}
                                color={'#00008B'}
                            />
                            <Button
                                activeOpacity={0.5}
                                onPress={this.createRoom} //-----------该属性需要保留！-------------
                                style={styles.button}>
                                <Text
                                    style={styles.btText}> 创 建 房 间</Text>
                            </Button>
                        </View>

                        <View style={styles.containerRow}>
                            <Entypo
                                style={{ marginRight: 8 }}
                                name={'shop'}
                                size={55}
                                onPress={this.shop}
                                color={'#00008B'}
                            />
                            <Button
                                activeOpacity={0.5}
                                onPress={this.enterRoom} //-----------该属性需要保留！-------------
                                style={styles.button}>
                                <Text
                                    style={styles.btText}> 加 入 房 间</Text>
                            </Button>
                        </View>
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
        alignItems: 'flex-end',
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 70,
        width: 240,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 18,
        backgroundColor: '#FF4500',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 20,
    },
    btText: {
        color: '#fff',
        fontFamily: 'zhenhunshoushu',
        fontSize: 40,
        paddingTop: 6,
    },
});