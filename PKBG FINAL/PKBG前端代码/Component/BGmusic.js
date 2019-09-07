import React, { Component } from 'react';
import { 
    StyleSheet,
    View, 
} from 'react-native';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class BGmusic extends Component {

    constructor(props) {
        super(props);
        this.player = ''
        this.state = {
            paused: false,
            playIcon: 'music'
        };
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
                />
            </View>
        );
    }
   
    play = () => {
        this.setState({
            paused: !this.state.paused,
            playIcon: this.state.paused ? 'music' : 'music-off'
        })
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