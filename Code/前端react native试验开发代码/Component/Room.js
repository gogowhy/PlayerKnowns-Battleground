import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
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
        
    }


    render() {
        return (
            <View
                style={styles.container}>
                <TouchableOpacity
                    
                    style={styles.button}>
                    <Text
                        style={styles.btText}>{this.state.id}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    
                    style={styles.button}>
                    <Text
                        style={styles.btText}>{this.state.password}</Text>
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
