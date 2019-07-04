import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

export default class End extends Component {

    /**
     * 成功登陆界面
     */

    render() {
        return (
            <View
                style={styles.container}>
                <Text
                    style={styles.content}
                >登陆成功!!</Text>
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
