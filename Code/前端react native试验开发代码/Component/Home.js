import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    ImageBackground,
    View,
    StyleSheet,
} from 'react-native';
import base from '../src/style/base';

export default class Home extends Component {

    constructor(props){
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
                source={require('../src/img/bg1.png')}>
                <TouchableOpacity
                    activeOpacity={1.0}  //设置背景被点击时，透明度不变
                    style={base.container}>
                    <View style={base.container}>
                        <Text style={base.content}>PlayerKnown's</Text>
                        <Text style={base.content}>BattleGround</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.ToLogin}  //添加点击事件
                        style={[base.button,base.buttonBig]}>
                        <Text
                            style={base.btText}>开始游戏</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

}
