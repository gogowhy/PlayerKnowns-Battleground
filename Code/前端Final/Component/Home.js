import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { Button } from 'native-base';
import base from '../src/style/base';
import BGmusic from './BGmusic';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.ToLogin = this.ToLogin.bind(this);
    }

    /**
     * 跳转到登陆界面
     */
    ToLogin() {
        const { navigate } = this.props.navigation;  //获取navigation的navigate方法
        navigate('Login');  //跳转到注册过的Login界面
    }
    /**
     * 渲染图形界面
     * @return {[type]} [返回所渲染的界面]
     */
    render() {
        return (
            <ImageBackground style={base.background}
                source={require('../src/img/ppp.png')}>
                <View style={base.container}>
                    <View style={{ height: 120 }} />
                    <Button
                        rounded
                        bordered
                        activeOpacity={0.5}
                        onPress={this.ToLogin} //-----------该属性需要保留！-------------
                        style={base.button}>
                        <Image
                            source={require('../src/img/start2.png')}
                            style={{ height: '180%', width: '180%', }}
                        />
                    </Button>
                </View>
                <BGmusic />
            </ImageBackground>
        );
    }
}
