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
        this.GunModePic = {
            "AK-47": require('../src/img/guns/AK47.png'),
            "AKM": require('../src/img/guns/AKM.png'),
            "M16": require('../src/img/guns/M16.png'),
            "M4A1": require('../src/img/guns/M4A1.png'),
            "M14EBR": require('../src/img/guns/M14EBR.png'),
            "scar-L": require('../src/img/guns/SCAR.png'),
            "QBZ95": require('../src/img/guns/QBZ95.png'),
            "Win94": require('../src/img/guns/Win94.png'),
            "VSS": require('../src/img/guns/VSS.png'),
            "s686": require('../src/img/guns/s686.png'),
            "s1897": require('../src/img/guns/S1897.png'),
            "Micro UZI": require('../src/img/guns/Microuzi.png'),
            "UMP9": require('../src/img/guns/UMP9.png'),
            "Vector": require('../src/img/guns/Vector.png'),
            "AWM": require('../src/img/guns/AWM.png'),
            "98K": require('../src/img/guns/98K.png'),
            "BarrettM82A1": require('../src/img/guns/BarrettM82A1.png'),
            "RPG": require('../src/img/guns/RPG.png'),
        }
    }

    Click_Gun() {
        this.props.Click_Gun(this.state.name);
    }

    render() {
        return (
            <Button style={styles.gunItem}
                onPress={this.Click_Gun}>
                <Image source={this.GunModePic[this.state.name]} style={styles.image}></Image>
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