import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
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

    enterRoom(){
        const { navigate } = this.props.navigation ;

        navigate('EnterRoom_inputID');
    
    }

    render() {
        return (
            <View
                style={styles.container}>
                <TouchableOpacity
                    onPress = {this.createRoom} //-----------该属性需要保留！-------------
                    style={styles.button}>
                    <Text
                        style={styles.btText}>创建房间</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {this.enterRoom} //-----------该属性需要保留！-------------
                    style={styles.button}>
                    <Text
                        style={styles.btText}>加入房间</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
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
    input: {
        width: 180,
        height: 50,
        fontSize: 18,
        color: '#000',//输入框输入的文本为黑色
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#FFFFF0',
        marginBottom: 8,
    },
    button: {
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FF4500',
        marginTop: 10,
        marginBottom: 10,
    },
    btText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    underline: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    ulText: {
        textDecorationLine:'underline',
        color: '#0000CD',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    }
});
