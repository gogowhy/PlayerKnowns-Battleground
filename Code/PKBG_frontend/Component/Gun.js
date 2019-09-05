import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Image,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import { Button } from 'native-base';

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

export default class Gun extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            price: this.props.price,
        }
        this.Click_Gun = this.Click_Gun.bind(this);
    }

    Click_Gun() {
        this.props.Click_Gun(this.state.name);
    }

    render() {
        var image = this.state.name;
        return (
            <Button style={styles.gunItem}
                onPress={this.Click_Gun}>
                <Image source={require('../src/img/guns/' + 'AK47.png')} style={styles.image}></Image>
                <Text style={styles.gunInfo}>
                    {this.state.name + '  ' + this.state.price}
                </Text>
            </Button>
        )
    }
}
const styles = StyleSheet.create({
    gunItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: (width - 80) / 3,
        height: (height - 100) / 2,
        backgroundColor: '#03172b', //黑蓝
        marginBottom: 8,
    },
    image: {
        width: (width - 80) / 3 - 16,
        height: (height - 100) / 2 - 40,
        backgroundColor: '#5d758e',//灰蓝
        resizeMode: 'contain'
    },
    gunInfo: {
        fontSize: 16,
        color: '#EEC900', //淡金
        marginTop: 4,
    }
})