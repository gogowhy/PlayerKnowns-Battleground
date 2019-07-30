import React, { Component } from 'react';
import { 
    StyleSheet,
    Text, 
    View, 
    Animated, 
    Easing, 
    Dimensions, 
    TouchableOpacity 
} from 'react-native';
import Video from 'react-native-video';

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

export default class BGmusic extends Component {

    constructor(props) {
        super(props);
        this.player = ''
        this.rotation = false
        this.state = {
            rotateValue: new Animated.Value(0),  //旋转
            btnStatus: 'pause',
            paused: false, // false: 表示播放，true: 表示暂停
            duration: 0.00,
        };
        this.mAnimate = Animated.timing(this.state.rotateValue, {
            toValue: 1,
            duration: 30000, //30s 旋转一次
            easing: Easing.inOut(Easing.linear),
        });
    }

    formatMediaTime(duration) {
        let min = Math.floor(duration / 60)
        let second = duration - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.Image ref='mAnimate' source={require("../src/img/ppp0.jpg")}
                    style={{
                        width: height / 2,
                        height: height / 2,
                        borderRadius: height / 4,
                        transform: [{
                            rotate: this.state.rotateValue.interpolate({ // 旋转，使用插值函数做值映射
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg'],
                            })
                        }],
                    }}
                />
                <TouchableOpacity
                    style={{ backgroundColor: '#9ed048', marginTop: 30, margin: 14, paddingLeft: 40, paddingRight: 40 }}
                    onPress={() => this.play()}>
                    <Text style={{ fontSize: 24 }}>{this.state.btnStatus}</Text>
                </TouchableOpacity>
                <Video source={require('../src/music/PlayerUnknownsBattlegrounds.mp3')}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    rate={1.0}                              // 0 is paused, 1 is normal.
                    volume={1.0}                            // 0 is muted, 1 is normal.
                    muted={false}                           // Mutes the audio entirely.
                    paused={this.state.paused}              // Pauses playback entirely.
                    resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                    repeat={true}                           // Repeat forever.
                    playInBackground={false}                // Audio continues to play when app entering background.
                    onLoadStart={this.loadStart}            // Callback when video starts to load
                    onLoad={data => this.setDuration(data)}               // Callback when video loads
                    onProgress={this.setTime}               // Callback every ~250ms with currentTime
                    onEnd={this.onEnd}                      // Callback when playback finishes
                    onError={(data) => this.videoError(data)}               //. Callback when video cannot be loaded
                    onBuffer={this.onBuffer}                //. Callback when remote video is buffering
                    onTimedMetadata={this.onTimedMetadata}  //. Callback when the stream receive some metadata
                    style={styles.backgroundVideo}/>
            </View>
        );
    }

    componentDidMount() {
        this.spin()
    }

    //重复动画
    _imgStarting = () => {
        if (this.rotation) {
            this.state.rotateValue.setValue(0);
            this.mAnimate.start(() => {
                this._imgStarting()
            })
        }
    };

    spin() {
        this.rotation = !this.rotation
        if (this.rotation) {
            this.mAnimate.start(() => {
                this.mAnimate = Animated.timing(this.state.rotateValue, {
                    toValue: 1,
                    duration: 30000,
                    easing: Easing.inOut(Easing.linear),
                });
                this._imgStarting()
            })
        } else {
            this.state.rotateValue.stopAnimation((oneTimeRotate) => {
                //计算角度比例
                this.mAnimate = Animated.timing(this.state.rotateValue, {
                    toValue: 1,
                    duration: (1 - oneTimeRotate) * 30000,
                    easing: Easing.inOut(Easing.linear),
                });
            });
        }
    }

    play() {
        this.spin()
        this.setState({
            paused: !this.state.paused,
            btnStatus: this.state.paused ? 'pause' : 'play'
        })
    }

    setDuration(duration) {
        this.setState({duration: duration.duration})
    }
    
    onEnd() {
        this.player.seek(0)
    }

    videoError(error) {title
        this.showMessageBar('播放器报错啦！')(error)('error')
    }

    showMessageBar = title => msg => type => {
        // 报错信息
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    backgroundVideo: {

    }
});