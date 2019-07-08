import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class End extends Component {

    /**
     * 这是一个我也不知道用在了哪里的界面 好像它根本没有作用
     * 
     * 但是我懒得删了
     * 
     */

    render() {
        return (
            <View
                style={styles.container}>
                <Text
                    style={styles.content}
                >游戏界面</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    content: {
        fontSize: 40,
    },
});
