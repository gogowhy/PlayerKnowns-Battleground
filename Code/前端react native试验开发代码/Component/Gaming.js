import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class Gaming extends Component {

    /**
     * 该页面为游戏界面，目前暂未开发
     * 
     * 更多内容敬请期待
     * 
     * ……
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
