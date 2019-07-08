import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ImageBackground,
} from 'react-native';
import base from '../src/style/base';
import header from '../src/style/header';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SectionView from './SectionView';

/**
 * 该常量初步定义了一个players应该具有、并在render中有所体现的属性
 * 
 * 属性 ： team \  name  \  isReady
 * 属性 ： 组别  、 用户名 、 是否准备
 */
const players = [
    {team : 'A' , name : 'wang haoyu' , isReady : true},
    {team : 'B' , name : 'zhou yifan' , isReady : true},
    {team : 'B' , name : 'qi peng' , isReady : true},
    {team : 'A' , name : 'xie yihan' , isReady : true}
]

/** 定义了同后端传递和接收指令的 Code 用来处理不同种类的消息 */
const START_GAME = 0 , READY = 1 , UNREADY = 2 , EXIT_BY_HOST = 3 , EXIT_BY_USER = 4 , CHANGE_TEAM_TO_A = 5 , CHANGE_TEAM_TO_B = 6 ;
const RELOAD = 90 , DISMISS = 91 , KICK = 92 , START = 93;

/** 定义了队伍常量 */
const TEAM_A = 0 , TEAM_B = 1;


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
            socketState : WebSocket.CLOSED, //socket的连接状态
            team : TEAM_A, //玩家所处队伍
        }

        /** 测试连接用公用wss地址 实际需要替换 */
        //this.ws = new WebSocket("ws://127.0.0.1:2003/myHandler/username="+this.state.username);
        this.ws = new WebSocket('wss://echo.websocket.org/');
        this.ConnectWebSocket = this.ConnectWebSocket.bind(this);
        this.gobackMainPage = this.gobackMainPage.bind(this);
        this.startGame = this.startGame.bind(this);
        this.ready = this.ready.bind(this);
        this.unready = this.unready.bind(this);
        this.exitRoom = this.exitRoom.bind(this);
        this.enterGame = this.enterGame.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
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
        
        this.ws.onopen = () => {
            // connection opened
            //this.ws.send('something'); // send a message
            this.setState(
                {
                    socketState : WebSocket.OPEN
                }
            )
        };
        
        this.ws.onmessage = (e) => {
        // a message was received
        console.log(e.data);
        let res = JSON.parse(e.data);
        switch(res.code) {
            // RELOAD即重新加载玩家，在该文件 Room.js 顶部已定义
            case RELOAD : this.setState(
                            { players : res.players }
                          );break;
            // DISMISS即强制解散房间，在该文件 Room.js 顶部已定义
            case DISMISS : alert("该房间已被强制解散！");
                           this.gobackMainPage();break;
            // KICK即被房主强制移除，在该文件 Room.js 顶部已定义
            case KICK : alert("您已被移出该房间！");
                        this.gobackMainPage();break;
            // START即进入游戏，在该文件 Room.js 顶部已定义
            case START : alert("正在进入游戏！");
                        this.enterGame();break;
        }
        };
        
        this.ws.onerror = (e) => {
        // an error occurred
        console.log(e.message);
        };
        
        this.ws.onclose = (e) => {
        // connection closed
        console.log(e.code, e.reason);
        };

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

            if(this.ws.readyState ==  WebSocket.OPEN){
                this.ws.send(JSON.stringify(data));
                alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }
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

        if(this.ws.readyState ==  WebSocket.OPEN){
            this.ws.send(JSON.stringify(data));
            alert(JSON.stringify(data)); //将send传递的字符串显示出来
        }

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

        if(this.ws.readyState ==  WebSocket.OPEN){
            this.ws.send(JSON.stringify(data));
            alert(JSON.stringify(data)); //将send传递的字符串显示出来
        }

        this.setState(
            {
                isReady : false
            }
        )
        }
    }

    changeTeam(){

        if(this.state.team)
        {
            let data ={
                code : CHANGE_TEAM_TO_A ,
                username : this.state.username
            }
    
            if(this.ws.readyState ==  WebSocket.OPEN){
                this.ws.send(JSON.stringify(data));
                alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }
    
            this.setState(
                {
                    team : TEAM_A
                }
            )            
        }
        else{
            let data ={
                code : CHANGE_TEAM_TO_B ,
                username : this.state.username
            }
    
            if(this.ws.readyState ==  WebSocket.OPEN){
                this.ws.send(JSON.stringify(data));
                alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }
    
            this.setState(
                {
                    team : TEAM_B
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
                username : this.state.username
            }
            
            if(this.ws.readyState ==  WebSocket.OPEN){
                this.ws.send(JSON.stringify(data));
                alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }

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
    
            if(this.ws.readyState ==  WebSocket.OPEN){
                this.ws.send(JSON.stringify(data));
                alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }
                    
            this.setState(
                {
                    host : false
                }
            )
            this.gobackMainPage();
        }
    }

    render() {
        
        if(this.state.socketState !== WebSocket.OPEN)
            return (
                <View style={base.container}>
                    <AntDesign
                        style={{marginBottom: 20}}
                        name = {'loading1'} 
                        size={30}
                    />
                    <Text style={styles.waiting}>正在建立连接...</Text>
                </View>
            )

        // const teamA_name = [];
        // const teamB_name = [];
    
        const T = this.state.team ? "B->A" : "A->B" ; //更换队伍按钮的文字说明

        // players.forEach((player) =>{
        //     if(player.team === 'A') teamA_name.push(player.name);
        //     if(player.team === 'B') teamB_name.push(player.name);
        // }
        // )

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
                               {'  '}房间密码：{this.state.password}
                            </Text>
                        </View>
                    </View>

                    <View style={base.containerTop}>
                        {StartOrReady}
                    
                        <TouchableOpacity
                            onPress = {this.changeTeam} //-----------该属性需要保留！-------------
                            style={base.button}>
                            <Text
                                style={base.btText}>{T}</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity
                            onPress = {this.exitRoom} //-----------该属性需要保留！-------------
                            style={base.button}>
                            <Text
                                style={base.btText}>退出房间</Text>
                        </TouchableOpacity> 
                    </View>
                                                
                    <SectionView></SectionView>

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
    },
    Table: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    waiting: {
        color: '#000',
        fontSize: 18,
        textAlignVertical: 'center', 
        textAlign: 'center', 
    }
});