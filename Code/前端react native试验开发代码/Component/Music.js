import React, { Component } from 'react';

import Sound from 'react-native-sound';
import { View } from 'native-base';
const musciPath = require('../src/music/PlayerUnknownsBattlegrounds.mp3');
const whoosh = new Sound(musciPath, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    music.setNumberOfLoops(-1);
});

export default class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 0.5
        }
    }
    // 声音+
    _addVolume = () => {
        let volume = this.state.volume;
        volume += 0.1;
        volume = parseFloat(volume).toFixed(1) * 1;
        if (volume > 1) {
            return alert('目前已经是最大音量');
        } this.setState({ volume: volume });
        whoosh.setVolume(volume);
    }

    // 声音-
    _reduceVolume = () => {
        let volume = this.state.volume;
        volume -= 0.1;
        volume = parseFloat(volume).toFixed(1) * 1;
        if (volume < 0) {
            return alert('当前为静音');
        }
        this.setState({ volume: volume });
        whoosh.setVolume(volume);
    }

    // 播放
    _play = () => {
        whoosh.play();
        this.time = setInterval(() => {
            whoosh.getCurrentTime(seconds => { seconds = Math.ceil(seconds); this._getNowTime(seconds) })
        }, 1000)
    }

    // 暂停
    _pause = () => {
        clearInterval(this.time);
        whoosh.pause();
    }

    // 停止	
    _stop = () => {
        clearInterval(this.time);
        this.setState({
            nowMin: 0,
            nowSec: 0,
            seconds: 0,
        })
        whoosh.stop();
    }
    render() {
        return (
            <View>
                <Text>当前音量: {this.state.volume}</Text>
                <Text onPress={this._addVolume}>声音+</Text>
                <Text onPress={this._reduceVolume}>声音-</Text>
                <Text onPress={this._play}>播放</Text>
                <Text onPress={this._pause}>暂停</Text>
                <Text onPress={this._stop}>停止</Text>
            </View>
        )
    }
}