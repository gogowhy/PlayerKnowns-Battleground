import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    ImageBackground,
    View,
    StyleSheet,
} from 'react-native';

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
            <ImageBackground style={styles.background}
                source={require('../src/img/bg1.png')}>
                <TouchableOpacity
                    activeOpacity={1.0}  //设置背景被点击时，透明度不变
                    style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.content}>PlayerKnown's</Text>
                        <Text style={styles.content}>BattleGround</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this.ToLogin}  //添加点击事件
                        style={styles.button}>
                        <Text
                            style={styles.btText}>开始游戏</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

}

/**
 * 设置界面的布局样式
 * @type {[StyleSheet]}
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    content: {
        fontFamily: 'Calibri',
        fontSize: 40,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: null,
        width: null,
        zIndex: -1,
    },
    button: {
        height: 40,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FF4500',
        marginTop: 50,
        marginBottom: 70,
    },
    btText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    }
});