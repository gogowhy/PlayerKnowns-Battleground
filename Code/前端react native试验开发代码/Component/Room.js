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
    Image,
    Dimensions,
    Platform,
    BackHandler
} from 'react-native';
import { Spinner, Button, Icon } from 'native-base';

import base from '../src/style/base';
import header from '../src/style/header';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

/**
 * 获取横屏时的屏幕宽度和高度
 * 
 */
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

if (windowHeight > windowWidth) {
    console.log("初始竖屏");
    var width = windowHeight;
    var height = windowWidth;
} else {
    console.log("初始横屏");
    var width = windowWidth;
    var height = windowHeight;
}


/**
 * 该常量初步定义了一个players应该具有、并在render中有所体现的属性
 * 
 * 属性 ： team \  name  \  isReady
 * 属性 ： 组别  、 用户名 、 是否准备
 *
const players = [
    {team : 'A' , name : 'wang haoyu' , isReady : false},
    {team : 'B' , name : 'zhou yifan' , isReady : true},
    {team : 'A' , name : 'qi peng' , isReady : true},
    {team : 'A' , name : 'xie yihan' , isReady : true}
]
*/
/** 定义了同后端传递和接收指令的 Code 用来处理不同种类的消息 */
const START_GAME = 0, READY = 1, UNREADY = 2, EXIT_BY_HOST = 3, EXIT_BY_USER = 4, CHANGE_TEAM_TO_A = 5, CHANGE_TEAM_TO_B = 6, NEW_PLAYER_JOIN = 7, INITIALIZE = 8;

const DISMISS = 90, KICK = 91;
/** 定义了队伍常量 */
const TEAM_A = 1, TEAM_B = 2;


export default class Room extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roomID: this.props.navigation.state.params.roomID, //房间ID
            password: this.props.navigation.state.params.password, //房间密码
            host: this.props.navigation.state.params.host, //是否为房主
            isReady: this.props.navigation.state.params.host, //是否准备
            username: this.props.navigation.state.params.username, //用户名
            players: [], //房间所有玩家
            socketState: WebSocket.CLOSED, //socket的连接状态
            team: TEAM_A, //玩家所处队伍
        }


        this.ws = new WebSocket("ws://49.234.27.75:2002/myHandler/ID=" + this.state.username + "ROOMNUMBER=" + this.state.roomID);

        this.ConnectWebSocket = this.ConnectWebSocket.bind(this);
        this.gobackMainPage = this.gobackMainPage.bind(this);
        this.startGame = this.startGame.bind(this);
        this.ready = this.ready.bind(this);
        this.unready = this.unready.bind(this);
        this.exitRoom = this.exitRoom.bind(this);
        this.enterGame = this.enterGame.bind(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.settings = this.settings.bind(this);
        this.help = this.help.bind(this);
    }

    componentDidMount() {
        this.ConnectWebSocket();
    }
    /** 对物理返回键设置监听 */
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener("back", this.gobackMainPage);
        } else {

        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener("back", this.gobackMainPage);
        } else {
            this.propstManger.addLengeData(this.props.navigator.getCurrentRoutes().length);
        }
    }

    /**
     * 打开了同后端的 WebSocket 的连接
     * 定义了同后端连接的方法
     * 
     *
     * 
     */
    ConnectWebSocket() {

        /** 定义了同后端连接的 url 并建立连接 */

        this.ws.onopen = () => {
            // connection opened

            if (this.state.host)  //如果是房主，创建新房间的时候不会收到后端的 INITIALIZE 消息，需要自行将自己的信息 push 进 players列表里
            {
                var newplayers = [];
                newplayers.push({ username: this.state.username, playerstatus: true, playerteam: TEAM_A });

                this.setState(
                    {
                        players: newplayers,
                        socketState: WebSocket.OPEN
                    }
                )

            }
            else {
                this.setState(
                    {
                        socketState: WebSocket.OPEN
                    }
                )
            }
        };

        this.ws.onmessage = (e) => {
            // a message was received
            if (this.ws.readyState !== WebSocket.OPEN) return;
            //alert(e.data);
            let res1 = JSON.parse(e.data);
            //alert(str);
            let res = res1.pop();
            switch (res.code) {
                // 进入游戏
                case START_GAME: {
                    //alert("正在进入游戏！");
                    this.enterGame(); break;
                }
                // 设置某玩家准备
                case READY: {
                    const username = res.username;
                    var newplayers = this.state.players;
                    newplayers.forEach((player) => {
                        if (player.username == username) {
                            player.playerstatus = 1;
                            return;
                        }
                    }
                    )

                    this.setState(
                        { players: newplayers }
                    )
                    break;
                }
                // 设置某玩家取消准备
                case UNREADY: {
                    const username = res.username;
                    var newplayers = this.state.players;
                    newplayers.forEach((player) => {
                        if (player.username == username) {
                            player.playerstatus = 0;
                            return;
                        }
                    }
                    )

                    this.setState(
                        { players: newplayers }
                    )
                    break;
                }

                // 房主退出了房间
                case EXIT_BY_HOST: {
                    const username = res.username;
                    const newhostname = res.hostname;
                    var newplayers = this.state.players;


                    for (var i = 0; i < newplayers.length; i++) {
                        if (newplayers[i].username == username) {
                            newplayers.splice(i, 1);
                            break;
                        }
                    }

                    newplayers.forEach((player) => {
                        if (player.username == newhostname) {
                            player.playerstatus = 1;
                            return;
                        }
                    }
                    )

                    if (newhostname == this.state.username) {
                        this.setState({
                            host: true,
                            isReady: true
                        })
                    }
                    this.setState(
                        {
                            players: newplayers,
                        }
                    )
                    break;
                }
                // 非房主退出了房间
                case EXIT_BY_USER: {
                    const username = res.username;
                    var newplayers = this.state.players;

                    for (var i = 0; i < newplayers.length; i++) {
                        if (newplayers[i].username == username) {
                            newplayers.splice(i, 1);
                            break;
                        }
                    }
                    this.setState(
                        {
                            players: newplayers,
                        }
                    )
                    break;
                }
                // 设置某玩家更换为A队
                case CHANGE_TEAM_TO_A: {
                    const username = res.username;
                    var newplayers = this.state.players;
                    newplayers.forEach((player) => {
                        if (player.username == username) {
                            player.playerteam = TEAM_A;
                            return;
                        }
                    }
                    )

                    if (res.username == this.state.username) {
                        this.setState(
                            {
                                team: TEAM_A
                            }
                        )
                    }

                    this.setState(
                        { players: newplayers }
                    )
                    break;
                }
                // 设置某玩家更换为B队
                case CHANGE_TEAM_TO_B: {
                    const username = res.username;
                    var newplayers = this.state.players;
                    newplayers.forEach((player) => {
                        if (player.username == username) {
                            player.playerteam = TEAM_B;
                            return;
                        }
                    }
                    )

                    if (res.username == this.state.username) {
                        this.setState(
                            {
                                team: TEAM_B
                            }
                        )
                    }

                    this.setState(
                        { players: newplayers }
                    )
                    break;
                }
                //  新玩家加入房间
                case NEW_PLAYER_JOIN: {

                    let newplayer = {
                        username: res.username,
                        playerstatus: false,
                        playerteam: res.playerteam,
                    }
                    var newplayers = this.state.players;
                    newplayers.push(newplayer);

                    this.setState(
                        { players: newplayers }
                    )
                    break;
                }
                // 获取初始值
                case INITIALIZE: {

                    var newplayers = res.players;
                    newplayers.push({ username: this.state.username, playerteam: res.playerteam, playerstatus: false }); //把自己的信息添加到列表里
                    this.setState(
                        {
                            team: res.playerteam == 1 ? TEAM_A : TEAM_B,
                            players: newplayers
                        }
                    )
                    break;
                }
                // 房间被强制解散
                case DISMISS: {
                    alert("该房间被强制解散！");
                    this.gobackMainPage();
                    break;
                }
                // 自己被踢出房间
                case KICK: {
                    alert("你已被强制请出房间！");
                    this.gobackMainPage();
                    break;
                }
                // 报错
                case -1: {
                    if (res.message)
                        alert(res.message);
                    else
                        alert("发生了一个意料之外的错误，请稍后再试。");
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
    gobackMainPage() {
        this.ws.close();
        this.setState({
            ws: this.ws.readyState
        });
        const { goBack } = this.props.navigation;
        goBack();
    }

    /** 进入游戏 */
    enterGame() {
        this.ws.close();
        this.setState({
            socketState: this.ws.readyState
        });
        const { navigate } = this.props.navigation;
        navigate('Gaming', { username: this.state.username, team: this.state.team, roomID: this.state.roomID });
    }

    /** 
     * 功能 ： 开始游戏
     * 触发 ： 房主点击“开始游戏”按钮
     * 
     * 检测是否还有玩家仍未准备，若无则向后端发送消息
     */
    startGame() {
        var flag = 1;
        this.state.players.forEach((player) => {
            if (!player.playerstatus) { alert("还有玩家未准备"); flag = 0; return; }
        }
        )
        /*
        const { navigate } = this.props.navigation ;
        navigate('Gaming',{username : this.state.username , team : this.state.team ,roomID : this.state.roomID });
        */
        if (flag) {
            /*
            此处向后端发送数据，该房间将进入游戏
            */
            let data = {
                code: START_GAME, // START_GAME为数字常量 定义在 Room.js的开头
                roomnumber: this.state.roomID,
                username: this.state.username
            }

            if (this.ws.readyState == WebSocket.OPEN) {
                this.ws.send(JSON.stringify(data));
                //alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }
        }

    }

    /**
     * 功能 ： 准备
     * 触发 ： 普通玩家（非房主）点击“准备”按钮
     * 
     * 变更为准备状态，并向后端发送消息
     */
    ready() {
        if (!this.state.isReady) {
            /**
             * 这里要实现用websocket向后端传达准备的功能
             * 
             * 参数：用户名
             * 
             * 
             */

            let data = {
                code: READY,
                username: this.state.username
            }

            if (this.ws.readyState == WebSocket.OPEN) {
                this.ws.send(JSON.stringify(data));
                //alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }

            this.setState(
                {
                    isReady: true
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
    unready() {
        if (this.state.isReady) {

            /**
             * 这里要实现用websocket向后端传达取消准备的功能
             * 
             * 参数：用户名
             */

            let data = {
                code: UNREADY,
                username: this.state.username
            }

            if (this.ws.readyState == WebSocket.OPEN) {
                this.ws.send(JSON.stringify(data));
                //alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }

            this.setState(
                {
                    isReady: false
                }
            )
        }
    }

    /**
     * 功能 ： 更换队伍
     * 触发 ： 玩家点击“更换队伍”按钮
     * 
     * 变更队伍，并向后端发送消息
     */
    changeTeam() {

        if (this.state.team == TEAM_B) {
            let data = {
                code: CHANGE_TEAM_TO_A,
                username: this.state.username
            }

            if (this.ws.readyState == WebSocket.OPEN) {
                this.ws.send(JSON.stringify(data));
                //alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }

        }
        else {
            let data = {
                code: CHANGE_TEAM_TO_B,
                username: this.state.username
            }

            if (this.ws.readyState == WebSocket.OPEN) {
                this.ws.send(JSON.stringify(data));
                //alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }

        }
    }


    /**
     * 功能 : 退出房间
     * 触发 ： 点击退出房间按钮
     * 
     * 退出该房间，向后端发送消息
     * 其中要区分房主与普通玩家，用于确认房主身份是否变更
     */
    exitRoom() {

        if (!this.state.host) {
            /**
             * 利用websocket向后端发送username表明退出房间
             */

            let data = {
                code: EXIT_BY_USER,
                username: this.state.username
            }

            if (this.ws.readyState == WebSocket.OPEN) {
                this.ws.send(JSON.stringify(data));
                //alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }

            this.gobackMainPage();
        }
        else {
            /**
             * 利用websocket向后端发送username表明退出房间
             * 
             * 且需要更换房主
             * 
             */

            let data = {
                code: EXIT_BY_HOST,
                username: this.state.username
            }

            if (this.ws.readyState == WebSocket.OPEN) {
                this.ws.send(JSON.stringify(data));
                //alert(JSON.stringify(data)); //将send传递的字符串显示出来
            }

            this.setState(
                {
                    host: false
                }
            )
            this.gobackMainPage();
        }
    }

    settings() {

    }

    help() {

    }

    render() {

        if (this.state.socketState !== WebSocket.OPEN)
            return (
                <View style={base.container}>
                    <Spinner />
                    <Text style={styles.waiting}>正在建立连接...</Text>
                </View>
            )

        var teamA = [['',''],['',''],['',''],['',''],['','']];
        var teamB = [['',''],['',''],['',''],['',''],['','']];

        this.state.players.forEach((player) => {
            if (player.playerteam == TEAM_A) {
                if (player.playerstatus) teamA.splice(['',''],1,[player.username, 'Ready']);
                if (!player.playerstatus) teamA.splice(['',''],1,[player.username, 'UnReady']);
            }

            if (player.playerteam == TEAM_B) {
                if (player.playerstatus) teamB.splice(['',''],1,[player.username, 'Ready']);
                if (!player.playerstatus) teamB.splice(['',''],1,[player.username, 'UnReady']);
            }
        })

        const ReadyOrNot = !this.state.isReady ? <Button
                rounded
                bordered
                activeOpacity={0.5}
                onPress={this.ready} //-----------该属性需要保留！-------------
                style={base.button}>
                <Image
                    source={require('../src/img/ready.png')}
                    style={{height: '180%', width:'180%',}}
                />
            </Button>
            :<Button
                rounded
                bordered
                activeOpacity={0.5}
                onPress={this.unready} //-----------该属性需要保留！-------------
                style={base.button}>
                <Image
                    source={require('../src/img/cancel.png')}
                    style={{height: '200%', width:'200%',}}
                />
            </Button> 

        const StartOrReady = this.state.host ? <Button
            rounded
            bordered
            activeOpacity={0.5}
            onPress={this.startGame} //-----------该属性需要保留！-------------
            style={base.button}>
            <Image
                source={require('../src/img/start2.png')}
                style={{height: '180%', width:'180%',}}
            />
        </Button>
            : ReadyOrNot;

        return (
            <ImageBackground style={base.background}
                source={require('../src/img/room.jpeg')}>
                <View style={{ flex: 1 }}>
                    <View style={header.container}>
                        <View style={header.header}>
                        <View style={header.Head}>
                                <Icon
                                    name={'md-exit'}
                                    onPress={this.exitRoom}
                                    style={{color: '#8A8A8A'}}
                                />
                            </View>
                            <View style={header.End}>
                                <Icon
                                    name={'md-settings'}
                                    onPress={this.settings}
                                    style={{color: '#8A8A8A', marginRight: 6 }}
                                />
                                <Entypo
                                    name={'help-with-circle'}
                                    size={26}
                                    style={{color: '#8A8A8A'}}
                                    onPress={this.help}
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
                            {'   '}房间密码：{this.state.password}
                        </Text>
                    </View>


                    <View style={base.containerTop}>
                        {StartOrReady}
                        
                        <Button
                            rounded
                            bordered
                            activeOpacity={0.5}
                            onPress={this.changeTeam} //-----------该属性需要保留！-------------
                            style={base.button}>
                            <Image
                                source={require('../src/img/change.png')}
                                style={{height: '180%', width:'180%',}}
                            />
                        </Button>

                        <Button
                            rounded
                            bordered
                            activeOpacity={0.5}
                            onPress={this.exitRoom} //-----------该属性需要保留！-------------
                            style={base.button}>
                            <Image
                                source={require('../src/img/exit.png')}
                                style={{height: '180%', width:'180%',}}
                            />
                        </Button>

                    </View>

                    <View style={styles.containerRow}>
                        <View style={styles.list}>
                            <SectionList
                                sections={[
                                    { title: 'A', data: teamA },
                                ]}
                                keyExtractor={(item, index) => item + index}
                                renderItem={this._renderSectionListItem}
                                renderSectionHeader={this._renderSectionHeader}
                                //ItemSeparatorComponent={() => <View style={{ backgroundColor: '#000', height: 2 }}></View>}  //分割线
                                //numColumns={2}
                                //columnWrapperStyle={{ borderWidth: 3, borderColor: '#f4f4f4' }}
                                style={{ margin: 4, borderWidth: 2, borderColor:'#EEC900', borderRadius: 2 }}
                            />
                            <SectionList
                                sections={[
                                    { title: 'B', data: teamB },
                                ]}
                                keyExtractor={(item, index) => item + index}
                                renderItem={this._renderSectionListItem}
                                renderSectionHeader={this._renderSectionHeader}
                                //ItemSeparatorComponent={() => <View style={{ backgroundColor: '#000', height: 2 }}></View>}  //分割线
                                //numColumns={2}
                                //columnWrapperStyle={{ borderWidth: 3, borderRadius:18, borderColor: 'black' }}
                                style={{ margin: 4, borderWidth: 2, borderColor:'#EEC900', borderRadius: 2 }}
                            />
                        </View>
                    </View>

                </View>
            </ImageBackground>
        );
    }

    _keyExtractor = (item, index) => "index" + item;

    _ItemSeparatorComponent = () => (
        <View style={{ backgroundColor: 'white', height: 1 }} />
    )

    _renderSectionListItem = ({ item }) => (
        <FlatList
            data={item}
            numColumns={2}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            //ItemSeparatorComponent={this._ItemSeparatorComponent}
        />
    )

    _renderItem = ({ item }) => {
        var txt = item;
        return (
            <View style={styles.cell}>
                <Text style={styles.cellText}>{txt}</Text>
            </View>
        )
    }

    _renderSectionHeader = ({ section }) => {
        var txt = ' Team ' + section.title;
        return (
            <View style={styles.SectionHeader}>
                <Text style={styles.SectionHeaderText}>{txt}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Text: {
        color: '#8A8A8A',
        fontWeight: 'bold',
        fontSize: 20,
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    RoomTitle: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    waiting: {
        color: '#000',
        fontSize: 18,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    list: {
        height: height - 160,
        width: width - 70,
        flexDirection: 'row',
        backgroundColor: '#5d758e',
        marginTop: 10,
        justifyContent: 'center',
        borderRadius: 5,
    },
    cell: {
        width: (width - 100) / 4 - 7,
        height: 34,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#03172b',
        borderWidth: 2,
        borderColor: '#CD9B1D',
        borderRadius: 2,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 3,
    },
    cellText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    SectionHeader: {
        height: 36,
        width: (width - 100) / 2 - 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#021f3c',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#EEC900',
        margin: 4,
        marginTop: 8,
    },
    SectionHeaderText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20,
    },
});