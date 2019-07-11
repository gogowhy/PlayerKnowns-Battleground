import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    SectionList,
    FlatList,
    ImageBackground,
    Dimensions
} from 'react-native';
import base from '../src/style/base';
import header from '../src/style/header';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
const {height,width} = Dimensions.get('window')

/**
 * 该常量初步定义了一个players应该具有、并在render中有所体现的属性
 * 
 * 属性 ： team \  name  \  isReady
 * 属性 ： 组别  、 用户名 、 是否准备
 */
const players = [
    {team : 'A' , name : 'wang haoyu' , isReady : false},
    {team : 'B' , name : 'zhou yifan' , isReady : true},
    {team : 'A' , name : 'qi peng' , isReady : true},
    {team : 'A' , name : 'xie yihan' , isReady : true}
]

/** 定义了同后端传递和接收指令的 Code 用来处理不同种类的消息 */
const START_GAME = 0 , READY = 1 , UNREADY = 2 , EXIT_BY_HOST = 3 , EXIT_BY_USER = 4 , CHANGE_TEAM_TO_A = 5 , CHANGE_TEAM_TO_B = 6 , NEW_PLAYER = 7 , INITIALIZE = 8;

const DISMISS = 90 ,KICK = 91;
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
        if(this.setState.ws !== WebSocket.OPEN) return;
        console.log(e.data);
        let res = JSON.parse(e.data);
        switch(res.code) {
            // 进入游戏
            case START_GAME : {
                alert("正在进入游戏！");
                this.enterGame();break;
            }
            // 设置某玩家准备
            case READY : {
                const username = res.username;
                var newplayers = this.state.players;
                newplayers.forEach( (player) => {
                    if(player.username == username){
                        player.playerstatus = 1 ;
                        return;
                    }
                }
                )

                this.setState(
                    { players : newplayers }
                )
                break;
            } 
            // 设置某玩家取消准备
            case UNREADY : {
                const username = res.username;
                var newplayers = this.state.players;
                newplayers.forEach( (player) => {
                    if(player.username == username){
                        player.playerstatus = 0 ;
                        return;
                    }
                }
                )

                this.setState(
                    { players : newplayers }
                )
                break;
            }

            // 房主退出了房间
            case EXIT_BY_HOST : {
                const username = res.username;
                const newhostname = res.hostname;
                var newplayers = this.state.players;

                
                for(var i = 0 ;i < newplayers.length ; i++){
                    if(newplayers[i].username == username)
                    {
                        newplayers.splice(i,1);
                        break;
                    }
                }
                this.setState(
                    {
                        players : newplayers,
                        hontname : newhostname
                    }
                )
                break;
            }
            // 非房主退出了房间
            case EXIT_BY_USER : {
                const username = res.username;
                var newplayers = this.state.players;

                for(var i = 0 ;i < newplayers.length ; i++){
                    if(newplayers[i].username == username)
                    {
                        newplayers.splice(i,1);
                        break;
                    }
                }
                this.setState(
                    {
                        players : newplayers,
                    }
                )
                break;
            }
            // 设置某玩家更换为A队
            case CHANGE_TEAM_TO_A : {
                const username = res.username;
                var newplayers = this.state.players;
                newplayers.forEach( (player) => {
                    if(player.username == username){
                        player.playerteam = TEAM_A ;
                        return;
                    }
                }
                )

                this.setState(
                    { players : newplayers }
                )
                break;
            }
            // 设置某玩家更换为B队
            case CHANGE_TEAM_TO_B : {
                const username = res.username;
                var newplayers = this.state.players;
                newplayers.forEach( (player) => {
                    if(player.username == username){
                        player.playerteam = TEAM_B ;
                        return;
                    }
                }
                )

                this.setState(
                    { players : newplayers }
                )
                break;
            }
            //  新玩家加入房间
            case NEW_PLAYER : {
                let newplayer = {
                    username : res.username,
                    playerstatus : false,
                    playerteam : res.playerteam,
                }
                var newplayers = this.state.players;
                newplayers.push(newplayer);

                this.setState(
                    { players : newplayers }
                )
                break;
            }
            // 获取初始值
            case INITIALIZE : {

                var newplayers = res.players;
                
                this.setState(
                    {
                        isReady : false,
                        team : res.playerteam == 1 ? TEAM_A : TEAM_B,
                        players : newplayers
                    }
                )
                break;
            }
            // 房间被强制解散
            case DISMISS : {
                alert("该房间被强制解散！");
                this.gobackMainPage();
                break;
            }
            // 自己被踢出房间
            case KICK : {
                alert("你已被强制请出房间！");
                this.gobackMainPage();
                break;
            }
            // 报错
            case -1 : {
                alert("发生了一个意料之外的错误。请稍后重试。");
                break;
            }
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
        this.ws.close();
        this.setState({
            ws : this.ws.readyState
        });
        const { goBack } = this.props.navigation ;
        goBack();
    }

    /** 进入游戏 */
    enterGame(){
        this.ws.close();
        this.setState({
            ws : this.ws.readyState
        });
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

        const teamA = [];
        const teamB = [];
    
        const T = this.state.team ? "B->A" : "A->B" ; //更换队伍按钮的文字说明

        players.forEach((player) =>{
            if(player.team === 'A') {
                if(player.isReady) teamA.push([player.name,'Ready']);
                if(!player.isReady) teamA.push([player.name,'UnReady']);
            }
            
            if(player.team === 'B') {
                if(player.isReady) teamB.push([player.name,'Ready']);
                if(!player.isReady) teamB.push([player.name,'UnReady']);
            }
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
                    style={{flex:1}}>
                    <View style={header.container}>
                        <View style={header.header}>
                            <View style={header.Head}>
                                <Ionicons
                                    name = {'md-exit'} 
                                    size = {30}
                                    onPress = {this.exitRoom}
                                />
                            </View>
                            <View style={header.End}>
                                <Entypo
                                    name = {'help-with-circle'}
                                    size = {28}
                                    onPress = {this.help}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={base.containerTop}>
                        <Text
                            style={styles.Text}>
                            房间号：{this.state.roomID}
                        </Text>
                        <Text
                            style={styles.Text}>
                            {'  '}房间密码：{this.state.password}
                        </Text>
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

                    <View style={styles.containerRow}>
                        <View style={styles.list}>
                            <SectionList 
                                sections={[
                                    {title: 'A', data: teamA},
                                ]}
                                keyExtractor={(item, index) => item + index}
                                renderItem={this._renderSectionListItem}
                                renderSectionHeader={this._renderSectionHeader}
                                ItemSeparatorComponent={() => <View style={{backgroundColor:'#DEDEDE',height:2}}></View>}  //分割线
                                numColumns={2}
                                columnWrapperStyle={{borderWidth:3, borderColor:'#f4f4f4'}}
                                style={{marginTop:10,marginLeft:5,marginRight:5}}
                            />
                            <SectionList
                                sections={[
                                    {title: 'B', data: teamB},
                                ]}
                                keyExtractor={(item, index) => item + index}
                                renderItem={this._renderSectionListItem}
                                renderSectionHeader={this._renderSectionHeader}
                                ItemSeparatorComponent={() => <View style={{backgroundColor:'#DEDEDE',height:2}}></View>}  //分割线
                                numColumns={2}
                                columnWrapperStyle={{borderWidth:3, borderColor:'black'}}
                                style={{marginTop:10,marginLeft:5,marginRight:5}}
                            />
                        </View>
                    </View>                            
                    
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    _keyExtractor = (item, index) => "index"+item;
 
    _ItemSeparatorComponent= () => (
        <View style={{backgroundColor:'white',height: 1}}/>
    )

    _renderSectionListItem = ({item}) => (
        <FlatList
          data={item}
          numColumns={2}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
        />
    )

    _renderItem = ({item}) => {
        var txt = item;
        return (
            <View style={styles.cell}>
                <Text style={styles.cellText}>{txt}</Text>
            </View>
        )
    }

    _renderSectionHeader = ({section}) => {
        var txt = ' Team ' + section.title;
        return (
            <View style={{height: 25, backgroundColor: '#11ffff', justifyContent: 'center'}}>
                <Text style={styles.SectionHeader}>{txt}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Text: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
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
    },
    list: {
        height: height-170,
        width: width-40,
        flexDirection: 'row',
        backgroundColor: '#DEDEDE',
    },
    cell: {
        width: (width-55)/4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#607B8B', 
        //marginHorizontal: 3,
    },
    cellText: {
        height: 30,
        textAlign: 'center', 
        textAlignVertical: 'center', 
        color: '#fff', 
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    SectionHeader: { 
        height: 30,
        textAlign: 'center', 
        textAlignVertical: 'center',
        backgroundColor: '#473C8B',
        color: 'white',
        fontSize: 20
    },
});