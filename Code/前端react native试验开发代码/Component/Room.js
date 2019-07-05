import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ImageBackground,
    SectionList
} from 'react-native';
import base from '../src/style/base';
import header from '../src/style/header';
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import WebSocket from 'react-native-websocket';

const wsUrl = "ws://localhost:8080";

const players = [
    {group : 'A' , name : 'wang haoyu' , isReady : true},
    {group : 'B' , name : 'zhou yifan' , isReady : true},
    {group : 'B' , name : 'qi peng' , isReady : true},
    {group : 'A' , name : 'xie yihan' , isReady : true}
]


export default class Room extends Component {

    constructor(props){
        super(props);
        this.state = {
            id : this.props.navigation.state.params.id , 
            password : this.props.navigation.state.params.password ,
            host : this.props.navigation.state.params.host ,
            isReady : this.props.navigation.state.params.host ,
            players : [] 
        }

        this.ConnectWebSocket = this.ConnectWebSocket.bind(this);
        this.gobackMainPage = this.gobackMainPage.bind(this);
        this.startGame = this.startGame.bind(this);
        this.ready = this.ready.bind(this);
        this.unready = this.unready.bind(this);
        this.exitRoom = this.exitRoom.bind(this);
    }

    componentDidMount(){
        this.ConnectWebSocket();
    }

    ConnectWebSocket(){
        const ws = new WebSocket(wsUrl);
          
        ws.onopen = () => {
            // connection opened
            ws.send('something'); // send a message
        };
          
        ws.onmessage = (e) => {
        // a message was received
        console.log(e.data);
        };
        
        ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
        };
        
        ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
        };
    }

    /* 返回游戏主页界面 */
    gobackMainPage(){
        const { goBack } = this.props.navigation ;
        goBack();
    }

    startGame(){
        var flag = 1;
        players.forEach((player) => {
            if(!player.isReady) {alert("还有玩家未准备"); flag = 0; return; }
        }
        )
        
        
        if(flag)
        {   
            /*
            此处向后端发送数据，该房间将进入游戏
            */
            const { navigate } = this.props.navigation ;
            navigate('Gaming');
        }
        

    }

    ready(){
        if(!this.state.isReady)
        /**
         * 这里要实现用websocket向后端传达准备的功能
         * 
         * 参数：用户名
         * 
         * 
         */
        this.setState(
            {
                isReady : true
            }
        )
    }

    unready(){
        if(this.state.isReady)
        /**
         * 这里要实现用websocket向后端传达取消准备的功能
         * 
         * 参数：用户名
         */
        this.setState(
            {
                isReady : false
            }
        )
    }

    exitRoom(){

        const { goBack } = this.props.navigation ;
        
        if(!this.state.host){
            /**
             * 利用websocket向后端发送username表明退出房间
             */
            goBack();
        }
        else{
            /**
             * 利用websocket向后端发送username表明退出房间
             * 
             * 且需要更换房主
             * 
             */
            this.setState(
                {
                    host : false
                }
            )
            goBack();
        }
    }

    render() {
    
        const groupA_name = [];
        const groupB_name = [];

        players.forEach((player) =>{
            if(player.group === 'A') groupA_name.push(player.name);
            if(player.group === 'B') groupB_name.push(player.name);
        }
        )
        
        const ReadyOrNot = !this.state.isReady ? <TouchableOpacity
                                                    onPress = {this.ready} //-----------该属性需要保留！-------------
                                                    style={base.button}>
                                                    <Text
                                                        style={base.btText}>准备</Text>
                                                </TouchableOpacity> 
                                              : <TouchableOpacity
                                                    onPress = {this.unready} //-----------该属性需要保留！-------------
                                                    style={base.button}>
                                                    <Text
                                                        style={base.btText}>取消准备</Text>
                                                </TouchableOpacity> ;

        const StartOrReady = this.state.host ? <TouchableOpacity
                                                    onPress = {this.startGame} //-----------该属性需要保留！-------------
                                                    style={base.button}>
                                                    <Text
                                                        style={base.btText}>开始游戏</Text>
                                                </TouchableOpacity>
                                             :  ReadyOrNot ;

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
                    
                    {StartOrReady}
                    
                    <TouchableOpacity
                        onPress = {this.exitRoom} //-----------该属性需要保留！-------------
                        style={base.button}>
                        <Text
                            style={base.btText}>退出房间</Text>
                    </TouchableOpacity> 
                                                
                    <View >
                    <SectionList
                        sections={[
                            {title: 'A', data: groupA_name},
                            {title: 'B', data: groupB_name},
                        ]}
                        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                    />
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