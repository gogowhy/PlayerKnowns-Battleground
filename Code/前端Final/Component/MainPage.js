import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
import { Icon, Button } from 'native-base';
import base from '../src/style/base';
import header from '../src/style/header';
import Fontisto from "react-native-vector-icons/Fontisto";
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
        const { navigate } = this.props.navigation;
        navigate('Warehouse', { username: this.state.username });
    }

    /** 
     * 功能 ：进入商店
     * 触发 ：点击“shop”图标
     * 
     * 跳转到商店页面（...js)
     * 
     */
    shop() {
        const { navigate } = this.props.navigation;
        navigate('Shop', { username: this.state.username });
    }

    render() {
        return (
            <ImageBackground style={base.background}
                source={require('../src/img/main.jpg')}>
                <TouchableOpacity
                    activeOpacity={1.0}  //设置背景被点击时，透明度不变
                    style={{ flex: 1 }}>
                    <View style={header.container}>
                        <View style={header.header}>
                            <View style={header.Head}>
                                <Icon
                                    name={'md-exit'}
                                    onPress={this.exit}
                                    style={{ color: '#8A8A8A' }}
                                />
                            </View>
                            <View style={header.End}>
                                <Fontisto
                                    style={{ color: '#8A8A8A', marginRight: 10, marginTop: 2 }}
                                    name={'shopify'}
                                    size={26}
                                    onPress={this.shop}
                                />
                                <Entypo
                                    style={{ color: '#8A8A8A' }}
                                    name={'shop'}
                                    size={30}
                                    onPress={this.warehouse}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={styles.containerRow}>
                            <Button
                                rounded
                                bordered
                                activeOpacity={0.5}
                                onPress={this.createRoom} //-----------该属性需要保留！-------------
                                style={[base.button, { height: 70, marginLeft: 40, width: 220 }]}>
                                <Image
                                    source={require('../src/img/create.png')}
                                    style={{ height: '220%', width: '220%', }}
                                />
                            </Button>
                        </View>

                        <View style={styles.containerRow}>
                            <Button
                                rounded
                                bordered
                                activeOpacity={0.5}
                                onPress={this.enterRoom} //-----------该属性需要保留！-------------
                                style={[base.button, { height: 70, marginLeft: 40, width: 220, borderWidth: 8 }]}>
                                <Image
                                    source={require('../src/img/join.png')}
                                    style={{ height: '220%', width: '220%', }}
                                />
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
        alignItems: 'flex-start',
    },
    containerRow: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});