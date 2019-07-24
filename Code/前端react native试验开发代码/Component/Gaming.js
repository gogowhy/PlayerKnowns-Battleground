import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity

} from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import base from '../src/style/base';
import AntDesign from "react-native-vector-icons/AntDesign";


const DONE = 101 , NOT_DONE = 102 , ALL_DONE = 103 , BE_SHOT = 7 , ONE_KILLED = 6 , WIN = 4 , LOSE = 5;

export default class Gaming extends Component {

    constructor(props){
        super(props);
        this.state = {
            username : this.props.navigation.state.params.username , //用户名
            roomID : this.props.navigation.state.params.roomID , 
            team : this.props.navigation.state.params.team ,
            socketState : WebSocket.CLOSED ,
            times : 1 , //次数
            stage : 0 , //阶段，包括录入信息、录入完成/录入不完成、等待他人录入完毕、游戏状态
            HP : 3 
        }

        this.ws = new WebSocket("ws://49.234.27.75:2003/myHandler/ID="+this.state.username+"ROOMNUMBER="+this.state.roomID);
        //this.ws = new WebSocket('wss://echo.websocket.org/');
        this.shoot = this.shoot.bind(this);
        this.ConnectWebSocket = this.ConnectWebSocket.bind(this);
    }

    componentDidMount(){
        this.ConnectWebSocket();
        
    }

    /**
     * 打开了同后端的 WebSocket 的连接
     * 定义了同后端连接的方法
     * 
     *
     * 
     */
    ConnectWebSocket(){
        
        /** 定义了同后端连接的 url 并建立连接 */
        
        this.ws.onopen = () => {
            // connection opened
            
            this.setState(
                {
                    socketState : WebSocket.OPEN
                }
            )
            alert("请拍摄自己的全身像3次，录入信息！");
        };
        
        this.ws.onmessage = (e) => {
        // a message was received
        if(this.ws.readyState !== WebSocket.OPEN) return;
        /** 下面这句到时候注释掉 */
        //if(this.ws.readyState == WebSocket.OPEN) return;
        alert(e.data);
        let res1 = JSON.parse(e.data);
        //alert(str);
        let res = res1.pop();
        
        switch(res.code){
            case DONE : {
                alert("人物特征已录入完毕。");
                this.setState({
                    stage : 2
                });
                break;
            }
            case NOT_DONE : {
                alert("人物特征不明确，请继续录入。");
                this.setState({
                    stage : 1 ,
                    times : 1
                });
                break;
            }
            case ALL_DONE : {
                alert("房间内所有玩家都录入完毕，准备开始游戏。");
                this.setState({
                    stage : 3
                });
                break;
            }
            case BE_SHOT : {
                alert("你被击中了。");
                var HP = this.state.HP - 1;
                this.setState({
                    HP : HP
                });
                break;
            }
            case ONE_KILLED : {
                if(res.shooter == this.state.username)
                    alert("您淘汰了"+res.victim+"!");
                else if(res.victim == this.state.username)
                    alert("您被"+res.shooter+"淘汰了！");
                else
                    alert(res.shooter+"淘汰了"+res.victim+"!");
                break;
            }
            case WIN : {
                alert("您的队伍获胜了！");
                break;
            }
            case LOSE : {
                alert("您的队伍失败了。");
                break;
            }
        }

        alert(e.data);

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
    
    async shoot(){
    if (this.camera) {
        const options = { quality: 1 , base64 : true , width : 1280};
        const photo = await this.camera.takePictureAsync(options);
        //console.log(photo.uri);
        //alert("h: " + photo.height +"w: " + photo.width);
        //console.warn(photo);
        this.sendphoto(photo);
    }      
    };

    async sendphoto(photo){
    
    const _this = this;

    const url = "https://api-cn.faceplusplus.com/humanbodypp/v1/detect";

    let data = {
        api_key : 'xqYKV2nwumRpfBxbF0THCxW0mNzZqUnC',
        api_secret : '73DpLjoIhxTsq-NN56we4NM-7Kf-lc8b',
        image_base64 : photo.base64,
    }

    const formData = new FormData();
    formData.append('api_key',data.api_key);
    formData.append('api_secret',data.api_secret);
    formData.append('image_base64',data.image_base64);
    formData.append('return_attributes','gender,upper_body_cloth,lower_body_cloth');
    
    var res ;

    await    axios({
        url: url,
        method: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
        timeout: 1000,//1秒超时时间
        
    }
    )
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

    handleResponse(people){

    people.forEach( person => {
        var rect = person.humanbody_rectangle;
        if(rect.left < 640 && rect.left + rect.width > 640)
        {
        if(rect.top < 480 && rect.top + rect.height > 480)
        {
            if(person.confidence > 85){
            if(this.state.stage == 0 || this.state.stage == 1)
            {
                

                let data = {code : 0,
                            times : this.state.times, 
                            playername : this.state.username,
                            male : person.attributes.gender.male ,
                            lower_body_cloth_color_r : person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.r ,
                            lower_body_cloth_color_g : person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.g ,
                            lower_body_cloth_color_b : person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.b ,
                            upper_body_cloth_color_r : person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.r ,
                            upper_body_cloth_color_g : person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.g ,
                            upper_body_cloth_color_b : person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.b ,
                            } ;
                if(this.state.socketState == WebSocket.OPEN)
                    {
                        this.ws.send(JSON.stringify(data));
                        alert(JSON.stringify(data));
                    }
                
                var times = this.state.times;
                times++;

                this.setState(
                    {
                        times : times
                    }
                )
            }
            else if(this.state.stage == 3){ //射击， username 是射击者， human_body是击中信息， 
                let data = {code : 2,
                            playername : this.state.username,
                            male : person.attributes.gender.male ,
                            lower_body_cloth_color_r : person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.r ,
                            lower_body_cloth_color_g : person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.g ,
                            lower_body_cloth_color_b : person.attributes.lower_body_cloth.lower_body_cloth_color_rgb.b ,
                            upper_body_cloth_color_r : person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.r ,
                            upper_body_cloth_color_g : person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.g ,
                            upper_body_cloth_color_b : person.attributes.upper_body_cloth.upper_body_cloth_color_rgb.b ,
                            } ;
                if(this.state.socketState == WebSocket.OPEN)
                {
                    this.ws.send(JSON.stringify(data));
                    alert(JSON.stringify(data));
                }


            }

                
            }
        }
        }
    });



    
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
        
        if(this.state.stage == 2)
            return (
                <View style={base.container}>
                    <AntDesign
                        style={{marginBottom: 20}}
                        name = {'loading1'} 
                        size={30}
                    />
                    <Text style={styles.waiting}>等待其他玩家录入信息...</Text>
                </View>
            )
        
        if(this.state.stage == 0 || this.state.stage == 1)
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
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.shoot} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> {this.state.times} </Text>
                    </TouchableOpacity>
                    
                </View>
                </View>
            );

        if(this.state.stage == 3){
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
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.shoot} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SHOOT </Text>
                    </TouchableOpacity>
                    
                </View>
                </View>
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
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });