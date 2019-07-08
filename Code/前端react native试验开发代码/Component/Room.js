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

/**
 * 该常量初步定义了一个players应该具有、并在render中有所体现的属性
 * 
 * 属性 ： group \  name  \  isReady
 * 属性 ： 组别  、 用户名 、 是否准备
 */
const players = [
    {group : 'A' , name : 'wang haoyu' , isReady : true},
    {group : 'B' , name : 'zhou yifan' , isReady : true},
    {group : 'B' , name : 'qi peng' , isReady : true},
    {group : 'A' , name : 'xie yihan' , isReady : true}
]

/** 定义了同后端传递和接收指令的 Code 用来处理不同种类的消息 */
const START_GAME = 0 , READY = 1 , UNREADY = 2 , EXIT_BY_HOST = 3 , EXIT_BY_USER = 4 ;
const RELOAD = 0 , DISMISS = 1 , KICK = 2 , START = 3;

export default class Room extends Component {

    constructor(props){
        super(props);
        this.state = {
            roomID : this.props.navigation.state.params.roomID , //房间ID
            password : this.props.navigation.state.params.password , //房间密码
            host : this.props.navigation.state.params.host , //是否为房主
            isReady : this.props.navigation.state.params.host , //是否准备
            username : this.props.navigation.state.params.username , //用户名
            players : [], //房间所有玩家
            ws : null //websocket接口
        }

        this.ConnectWebSocket = this.ConnectWebSocket.bind(this);
        this.gobackMainPage = this.gobackMainPage.bind(this);
        this.startGame = this.startGame.bind(this);
        this.ready = this.ready.bind(this);
        this.unready = this.unready.bind(this);
        this.exitRoom = this.exitRoom.bind(this);
        this.enterGame = this.enterGame.bind(this);
    }
    
    componentDidMount(){
        this.ConnectWebSocket();
    }

    /**
     * 打开了同后端的 WebSocket 的连接
     * 定义了同后端连接的方法
     * 
     * 其中onmessage有三类
     * 
     * 1.有新玩家加入该房间时，接收信息，修改state，重新渲染玩家列表
     * 2.由于长时间未开始游戏（或一些其他情况），房间被强制解散
     * 3.被房主移出该房间
     * 
     */
    ConnectWebSocket(){
        
        /** 定义了同后端连接的 url 并建立连接 */
        const wsUrl = "ws://127.0.0.1:2003/myHandler/username="+this.state.username;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            // connection opened
            ws.send('something'); // send a message
        };
        
        ws.onmessage = (e) => {
        // a message was received
        console.log(e.data);
        switch(e.data.code) {
            // RELOAD即重新加载玩家，在该文件 Room.js 顶部已定义
            case RELOAD : this.setState(
                            { players : e.data.players}
                          );break;
            // DISMISS即强制解散房间，在该文件 Room.js 顶部已定义
            case DISMISS : alert("该房间已被强制解散！");
                           this.gobackMainPage();break;
            // KICK即被房主强制移除，在该文件 Room.js 顶部已定义
            case KICK : alert("您已被移出该房间！");
                        this.gobackMainPage();break;
            // START即进入游戏，在该文件 Room.js 顶部已定义
            case START : this.enterGame();break;
        }
        };
        
        ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
        };
        
        ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
        };

        ws.onopen("ss");

        this.setState({ws : ws});
    }

    /** 返回上一个界面 */
    gobackMainPage(){
        const { goBack } = this.props.navigation ;
        goBack();
    }

    /** 进入游戏 */
    enterGame(){
        const { navigate } = this.props.navigation ;
        navigate('Gaming');
    }

    /** 
     * 功能 ： 开始游戏
     * 触发 ： 房主点击“开始游戏”按钮
     * 
     * 检测是否还有玩家仍未准备，若无则向后端发送消息
     */
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
            let data = {
                code : START_GAME , // START_GAME为数字常量 定义在 Room.js的开头
                roomID : this.state.roomID
            }

            this.state.ws.send(data);

        }
        

    }

    /**
     * 功能 ： 准备
     * 触发 ： 普通玩家（非房主）点击“准备”按钮
     * 
     * 变更为准备状态，并向后端发送消息
     */
    ready(){
        if(!this.state.isReady)
        {
        /**
         * 这里要实现用websocket向后端传达准备的功能
         * 
         * 参数：用户名
         * 
         * 
         */

        let data ={
            code : READY ,
            username : this.state.username
        }

        this.state.ws.send(data);

        this.setState(
            {
                isReady : true
            }
        )
        }
        
    }

    /**
     * 功能 ： 取消准备
     * 触发 ： 普通玩家（非房主）点击“取消准备”按钮
     * 
     * 变更为非准备状态，并向后端发送消息
     */
    unready(){
        if(this.state.isReady){

        /**
         * 这里要实现用websocket向后端传达取消准备的功能
         * 
         * 参数：用户名
         */

        let data ={
            code : UNREADY ,
            username : this.state.username
        }

        this.state.ws.send(data);

        this.setState(
            {
                isReady : false
            }
        )
        }
    }

    /**
     * 功能 : 退出房间
     * 触发 ： 点击退出房间按钮
     * 
     * 退出该房间，向后端发送消息
     * 其中要区分房主与普通玩家，用于确认房主身份是否变更
     */
    exitRoom(){

        
        
        if(!this.state.host){
            /**
             * 利用websocket向后端发送username表明退出房间
             */

            let data = {
                code : EXIT_BY_USER,
                username : this.username
            }
            
            this.state.ws.send(data);

            this.gobackMainPage();
        }
        else{
            /**
             * 利用websocket向后端发送username表明退出房间
             * 
             * 且需要更换房主
             * 
             */

            let data ={
                code : EXIT_BY_HOST ,
                username : this.state.username
            }
    
            this.state.ws.send(data);

            this.setState(
                {
                    host : false
                }
            )
            this.gobackMainPage();
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
                                房间号：{this.state.roomID}
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