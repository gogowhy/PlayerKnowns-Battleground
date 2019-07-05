import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ImageBackground
} from 'react-native';
import base from '../src/style/base';
import header from '../src/style/header';
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from 'axios';

export default class Room extends Component {

    /**
     * 成功登陆界面
     */
    constructor(props){
        super(props);
        this.state = {
            id : this.props.navigation.state.params.id , 
            password : this.props.navigation.state.params.password
        }
        this.gobackMainPage = this.gobackMainPage.bind(this);
    }

    /* 返回游戏主页界面 */
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
                    <View 
                        style={header.Head}>
                        <Ionicons 
                            name = {'md-arrow-round-back'} 
                            size={30}
                            onPress = {this.gobackMainPage}
                        />
                    </View>
                    <View>
                        <View 
                            style={base.containerTop}>
                            <Text
                                style={styles.Text}>
                                房间号：{this.state.id}
                            </Text>
                            <Text
                                style={styles.Text}>
                                房间密码：{this.state.password}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    Text: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    RoomTitle:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});