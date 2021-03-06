import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ImageBackground,
    Image,
    Dimensions
} from 'react-native';
import { RNCamera } from 'react-native-camera';

//import CountDown from 'react-native-countdown-component';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from "react-native-vector-icons/Feather";

import axios from 'axios';
import base from '../src/style/base';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button, Spinner, Icon } from 'native-base';

import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
const { Marker } = Overlay;
import BaiduMap from './Map';

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

const DONE = 101, NOT_DONE = 102, ALL_DONE = 103, HIT = 7, BE_SHOT = 8, ONE_KILLED = 6, WIN = 4, LOSE = 5, TAKE_PHOTO_AIM = 9, POSITION = 10;

export default class Gaming extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.navigation.state.params.username, //用户名
            roomID: this.props.navigation.state.params.roomID,
            team: this.props.navigation.state.params.team,
            players: this.props.navigation.state.params.players,
            socketState: WebSocket.CLOSED,
            times: 1, //次数
            stage: 0, //阶段，包括录入信息、录入完成/录入不完成、等待他人录入完毕、游戏状态
            HP: 100,
            killamount: 0,
            teammates: this.props.navigation.state.params.amount_of_teammates,
            enemies: this.props.navigation.state.params.amount_of_enemies,
            take_photo_aim: null,
            win: false,
            lose: false,
            gun : null,
            /**以下是Map需要用到的 */
            Using_map: false,
            center: {
                longitude: 113.896198,
                latitude: 22.959144,
            },
            teammates_center: []
        }

        this.ws = new WebSocket("ws://49.234.27.75:2003/myHandler/ID=" + this.state.username + "ROOMNUMBER=" + this.state.roomID);
        this.shoot = this.shoot.bind(this);
        this.timeOut = this.timeOut.bind(this);
        this.gotoMap = this.gotoMap.bind(this);
        this.ConnectWebSocket = this.ConnectWebSocket.bind(this);
        this.SendAndReceivePosition = this.SendAndReceivePosition.bind(this);

        this.timer = setInterval(this.SendAndReceivePosition, 3000);
        this.Use_Map = this.Use_Map.bind(this);
        this.UnUse_Map = this.UnUse_Map.bind(this);

        this.photo_empty = true;
        this.photo = null;
    }

    componentDidMount() {

        this.ConnectWebSocket();

        Geolocation.getCurrentPosition()
            .then(data => {
                console.log(data);
                this.setState({
                    center: {
                        longitude: data.longitude,
                        latitude: data.latitude
                    },
                })
            })
            .catch(e => {
                console.warn(e, 'error');
            })

    }

    SendAndReceivePosition() {

        Geolocation.getCurrentPosition()
            .then(data => {
                console.log(data);
                this.setState({
                    center: {
                        longitude: data.longitude,
                        latitude: data.latitude
                    },
                })

                let data1 = {
                    code: POSITION,
                    playername: this.state.username,
                    longitude: data.longitude,
                    latitude: data.latitude
                }

                if (this.state.socketState == WebSocket.OPEN) {
                    this.ws.send(JSON.stringify(data1));
                    //alert(JSON.stringify(data1));
                }
            })
            .catch(e => {
                console.warn(e, 'error');
            })

    }

    Use_Map() {
        
        this.setState({
            Using_map: true
        })
    }

    UnUse_Map() {
        this.setState({
            Using_map: false
        })
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

            this.setState(
                {
                    socketState: WebSocket.OPEN
                }
            )

        };

        this.ws.onmessage = (e) => {
            // a message was received
            if (this.ws.readyState !== WebSocket.OPEN) return;
            /** 下面这句到时候注释掉 */
            //if(this.ws.readyState == WebSocket.OPEN) return;
            //alert(e.data);
            let res1 = JSON.parse(e.data);
            //alert(str);
            let res = res1.pop();

            switch (res.code) {
                case DONE: {
                    alert("人物特征已录入完毕。");
                    this.setState({
                        stage: 2
                    });
                    break;
                }
                case NOT_DONE: {
                    alert("人物特征不明确，请继续录入。");
                    this.setState({
                        stage: 1,
                        times: 1
                    });
                    break;
                }
                case ALL_DONE: {
                    alert("房间内所有玩家都录入完毕，准备开始游戏。");
                    this.setState({
                        stage: 3
                    });
                    break;
                }

                case ONE_KILLED: {
                    if (res.shooter == this.state.username)
                        alert("您淘汰了" + res.victim + "!");
                    else if (res.victim == this.state.username) {
                        alert("您被" + res.shooter + "淘汰了！");
                        this.setState({
                            stage: 4
                        });
                    }
                    else
                        alert(res.shooter + "淘汰了" + res.victim + "!");

                    this.state.players.forEach((player) => {
                        if (player.username == res.victim) {
                            if (player.playerteam == this.state.team) {
                                var temp = this.state.teammates - 1;
                                this.setState({
                                    teammates: temp
                                })
                            }
                            else {
                                var temp = this.state.enemies - 1;
                                this.setState({
                                    enemies: temp
                                })
                            }
                            return;
                        }
                    })
                    break;
                }
                case WIN: {
                    alert("您的队伍获胜了！");
                    this.setState({
                        win: true
                    })
                    break;
                }
                case LOSE: {
                    alert("您的队伍失败了。");
                    this.setState({
                        lose: true
                    })
                    break;
                }
                case BE_SHOT: {
                    alert("您被" + res.shooter + "击中了。");
                    var HP = this.state.HP - res.damage;
                    this.setState({
                        HP: HP
                    });
                    break;
                }
                case HIT: {
                    alert("你击中了" + res.victim + "！");
                    var killamount = this.state.killamount + 1;
                    this.setState({
                        killamount: killamount
                    });
                    break;
                }
                case TAKE_PHOTO_AIM: {
                    alert("请在光线明亮的地方拍摄" + res.target + "全身像，以录入信息。");
                    this.setState({
                        take_photo_aim: res.target,
                        gun : res.weapon
                    })
                    break;
                }
                case POSITION: {

                    cur_center = [];

                    res.teammates_center.forEach((one_center) => {
                        cur_center.push({ playername: one_center.playername, center: { longitude: one_center.longitude, latitude: one_center.latitude } });
                    })


                    this.setState({
                        teammates_center: cur_center,
                    })
                    break;
                }
            }

            //alert(e.data);

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

    async shoot() {
        if(this.photo_empty){
            if (this.camera) {

                this.photo_empty = false;
                setTimeout( () => { this.photo_empty = true, this.photo = null} , 2 );

                const options = { quality: 1, base64: true, width: 1280 };
                this.photo = await this.camera.takePictureAsync(options);
                
                //console.log(photo.uri);
                //alert("h: " + photo.height +"w: " + photo.width);
                //console.warn(photo);
                this.sendphoto(this.photo);
            }
            
        }
        else{
            this.sendphoto(this.photo);
        }
    };

    async sendphoto(photo) {

        const _this = this;

        const url = "https://api-cn.faceplusplus.com/humanbodypp/v1/detect";

        let data = {
            api_key: 'xqYKV2nwumRpfBxbF0THCxW0mNzZqUnC',
            api_secret: '73DpLjoIhxTsq-NN56we4NM-7Kf-lc8b',
            image_base64: photo.base64,
        }

        const formData = new FormData();
        formData.append('api_key', data.api_key);
        formData.append('api_secret', data.api_secret);
        formData.append('image_base64', data.image_base64);
        formData.append('return_attributes', 'gender,upper_body_cloth,lower_body_cloth');

        var res;

        await axios({
            url: url,
            method: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false,
            timeout: 1000,//1秒超时时间

        })
            .then(function (response) {
                // handle success
                res = response.data;
            })
            .catch(function (error) {
                // handle error
                alert(error);
                //console.warn(error);
            })
            .then(function () {
                // always executed
            });
        this.handleResponse(res.humanbodies);

    }

    handleResponse(people) {

        people.forEach(person => {
            var rect = person.humanbody_rectangle;
            if (rect.left < 640 && rect.left + rect.width > 640) {
                if (rect.top < 480 && rect.top + rect.height > 480) {
                    if (person.confidence > 85) {
                        if (this.state.stage == 0 || this.state.stage == 1 && this.state.take_photo_aim) {

                            let data = {
                                code: 0,
                                times: this.state.times,
                                target: this.state.take_photo_aim,
                                playername: this.state.username,
                                male: person.attributes.gender.male,
                                lower_body_cloth_color_r: person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.r,
                                lower_body_cloth_color_g: person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.g,
                                lower_body_cloth_color_b: person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.b,
                                upper_body_cloth_color_r: person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.r,
                                upper_body_cloth_color_g: person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.g,
                                upper_body_cloth_color_b: person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.b,
                            };
                            if (this.state.socketState == WebSocket.OPEN) {
                                this.ws.send(JSON.stringify(data));
                                //alert(JSON.stringify(data));
                            }

                            var times = this.state.times;
                            times++;

                            this.setState(
                                {
                                    times: times
                                }
                            )
                        }
                        else if (this.state.stage == 3) { //射击， playername 是射击者， human_body是击中信息， 
                            let data = {
                                code: 2,
                                playername: this.state.username,
                                male: person.attributes.gender.male,
                                lower_body_cloth_color_r: person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.r,
                                lower_body_cloth_color_g: person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.g,
                                lower_body_cloth_color_b: person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.b,
                                upper_body_cloth_color_r: person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.r,
                                upper_body_cloth_color_g: person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.g,
                                upper_body_cloth_color_b: person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.b,
                            };
                            if (this.state.socketState == WebSocket.OPEN) {
                                this.ws.send(JSON.stringify(data));
                                //alert(JSON.stringify(data));
                            }

                        }

                    }
                }
            }
        });

    }

    timeOut() {
        alert('时间耗尽! 游戏结束!');
        const { navigate } = this.props.navigation;
        navigate('Result', { username: this.state.username, team: this.state.team });
    }

    /** 跳转到地图界面 */
    gotoMap() {
        const { navigate } = this.props.navigation;
        navigate('Map');
    }

    render() {

        if (this.state.Using_map) return (<BaiduMap teammates_position={this.state.teammates_position} UnUse_Map={this.UnUse_Map} center={this.state.center} BigOrSmall={true} />);

        if (this.state.socketState !== WebSocket.OPEN)
            return (
                <ImageBackground style={[base.background, { flexDirection: 'row', alignItems: 'flex-end' }]}
                    source={require('../src/img/room.jpeg')}>
                    <View style={[base.container, { marginBottom: 25 }]}>
                        <Spinner
                            color={'white'}
                        />
                        <Text style={styles.waiting}>正在建立连接...</Text>
                    </View>
                </ImageBackground>
            )

        if (this.state.stage == 2)
            return (
                <ImageBackground style={[base.background, { flexDirection: 'row', alignItems: 'flex-end' }]}
                    source={require('../src/img/room.jpeg')}>
                    <View style={[base.container, { marginBottom: 25 }]}>
                        <Spinner
                            color={'white'}
                        />
                        <Text style={styles.waiting}>等待其他玩家录入信息...</Text>
                    </View>
                </ImageBackground>
            )

        if (this.state.stage == 0 || this.state.stage == 1)
            return (
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes);
                        }}
                    />
                    <ImageBackground style={[base.background, { justifyContent: 'flex-end', zIndex: 1 }]}
                        source={require('../src/img/picture.png')}>
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <Button
                                rounded
                                activeOpacity={0.5}
                                onPress={this.shoot}
                                style={[styles.capture, styles.style, { marginRight: 30 }]}>
                                <Text style={styles.txt}> {'  第' + this.state.times + '次录入  '} </Text>
                            </Button>
                        </View>

                    </ImageBackground>
                </View>
            );

        if (this.state.stage == 3) {
            return (
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes);
                        }}
                    />
                    <View style={{flexDirection:'column',flex:0,justifyContent: 'flex-start', alignItems: 'center', margin: 15}}>
                        <View style={{ flex: 2, alignItems: 'flex-start', margin: 15 }}>
                            {/* <Icon
                                        name={'md-exit'}
                                        onPress={this.exit}
                                        style={{ color: '#8A8A8A' }}
                                /> */}
                        </View>
                        <View style={{ flex: 3, alignItems: 'center' }}>
                            <TouchableOpacity style={[styles.style, styles.head]}>
                                <Text style={styles.txt}>
                                    {'  ' + this.state.teammates + ' vs ' + this.state.enemies + '  '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.smallMap,{backgroundColor: '#000'}}>

                            {/** 小地图按钮，单击打开大地图 */}
                        {/* <BaiduMap Use_Map={this.Use_Map} center={this.state.center} BigOrSmall={false} /> */}
                        </View>
                    </View >
                   
                    <View style={StyleSheet.absoluteFill}>
                        <TouchableWithoutFeedback>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../src/img/aim.png')}
                                    style={{ height: '50%', width: '50%' }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.style, styles.info]}>
                                <Text style={styles.txt}>
                                    {' 击杀人数：' + this.state.killamount + ' '}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.style, styles.info]}>
                                <Text style={styles.txt}>
                                    {' 当前血量：' + this.state.HP  + ' '}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            rounded
                            activeOpacity={0.5}
                            style={[styles.style, styles.capture]}
                            onPress={this.shoot}>
                            <Feather
                                name={'target'}
                                size={36}
                                color={'#EEC900'}
                            />
                        </TouchableOpacity>
                        <View style={styles.smallMap,{backgroundColor: '#000'}}>
                            {/** 小地图按钮，单击打开大地图 */}
                            <BaiduMap Use_Map={this.Use_Map} center={this.state.center} BigOrSmall={false} />
                        </View>
                    </View>

                </View >
            )
        }

        if (this.state.stage == 4) {

            clearInterval(this.timer);

            return (
                <ImageBackground style={[base.background, { flexDirection: 'row', alignItems: 'flex-end' }]}
                    source={require('../src/img/room.jpeg')}>
                    <View style={[base.container, { marginBottom: 35 }]}>
                        <Text style={styles.waiting}>您已经被淘汰了</Text>
                    </View>
                </ImageBackground>
            )
        }

        if (this.state.win) {
            return (
                <ImageBackground style={base.background}
                    source={require('../src/img/win.png')}>
                </ImageBackground>
            )
        }

        if (this.state.lose) {
            return (
                <ImageBackground style={base.background}
                    source={require('../src/img/lose.png')}>
                </ImageBackground>
            )
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    head: {
        alignSelf: 'center',
        marginTop: 15,
    },
    info: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-end',
        marginBottom: 15,
        marginLeft: 15,
    },
    capture: {
        borderRadius: 25,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginBottom: 15,
        marginRight: 20,
    },
    waiting: {
        color: '#fff',
        fontSize: 18,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    style: {
        backgroundColor: '#021f3c', //深蓝
        borderColor: '#CD9B1D', //深金
        borderWidth: 2,
        padding: 5,
        borderRadius: 15,
    },
    txt: {
        fontSize: 20,
        color: '#EEC900', //淡金
        fontWeight: 'bold',
    },
    smallMap: {
        position: 'absolute',
        alignItems: 'flex-end',
        margin: 15,
        marginRight: 20,
        width: 100,
        height: 100,
        zIndex: 3
    }
});