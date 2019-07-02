import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button
} from 'react-native';

export default class End extends Component {

    /**
     * 返回到登陆界面
     */
    backToLogin = () => {
    }

    render() {
        return (
            <View
                style={styles.container}>
                <Text
                    style={styles.content}
                >登录成功!这是主页!</Text>

                <Button
                    onPress={this.backToLogin}  //添加点击事件
                    style={styles.button}
                    title='点击返回登陆'  //添加按钮标题
                />
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
