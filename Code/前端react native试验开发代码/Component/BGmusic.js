import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Sound from 'react-native-sound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let mp3 = require('../src/music/PlayerUnknownsBattlegrounds.mp3');//支持众多格式//如果是网络音频，使用 new Sound(mp3,null,error => {})
let whoosh = new Sound(mp3, (error) => {
    if (error) {
        return console.log('资源加载失败', error);
    }
    whoosh.play(() => whoosh.release());
});
// Reduce the volume by half
whoosh.setVolume(0.5);

// Loop indefinitely until stop() is called
whoosh.setNumberOfLoops(-1);

export default class BGmusic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            volume: 0.5,
            paused: false,
            playIcon: 'music-off'
        }
    }

    play = () => {
        this.state.paused == !this.state.paused;
        this.state.paused ? whoosh.play() : whoosh.pause();
        this.setState({
            paused: !this.state.paused,
            playIcon: this.state.paused ? 'music-off' : 'music'
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <MaterialCommunityIcons
                    name={this.state.playIcon}
                    size={26}
                    color={'#8A8A8A'}
                    onPress={this.play}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'flex-end',
        marginRight: 20,
        marginBottom: 20,
    },
});