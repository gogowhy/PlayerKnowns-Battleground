import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    ImageBackground,
    Image,
    Dimensions,
    FlatList
} from 'react-native';
import { Form, Button, Icon } from 'native-base';
import base from '../src/style/base';
import header from '../src/style/header';
import Fontisto from "react-native-vector-icons/Fontisto";
import axios from 'axios';
import Gun from './Gun';

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


/** 定义了同后端传递和接收指令的 Code 用来处理不同种类的 登录的响应状态 */


/* 组件 : Warehouse
-- 作用 : 展示个人仓库
*/
export default class Warehouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.navigation.state.params.username,
            guns: [],
            using_gun: 'M16',
        }
        this.set_Using_Gun = this.set_Using_Gun.bind(this);
        this.shop = this.shop.bind(this);
        this.goback = this.goback.bind(this);
    }

    async componentDidMount() {

        const _this = this;

        const url = "http://49.234.27.75:2001/user/getstorage";

        let data = {
            username: _this.state.username
        }

        var code = 1;
        var guns = [];
        await axios.post(url, data)
            .then(function (response) {
                // handle success

                _this.setState({
                    guns: response.data.guns,
                    using_gun: response.data.using_gun
                })
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                code = -2;
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        switch (code) {
            case -2: alert("服务器异常！"); break;
        }
    }


    async set_Using_Gun(gun_name) {

        const _this = this;

        const url = "http://49.234.27.75:2001/user/equip";

        let data = {
            username: _this.state.username,
            weapon: gun_name
        }

        var code = 1;
        var guns = [];
        await axios.post(url, data)
            .then(function (response) {
                // handle success
                code = response.data;
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                code = -2;
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        switch (code) {
            case 0: this.setState({ using_gun: gun_name }); break;
            case 1: alert("未响应！"); break;
            case -2: alert("服务器异常！"); break;
            case -1: alert("设置错误，请稍后重试。"); break;

        }

    }

    /** 
     * 功能 ：进入商店
     * 触发 ：点击“shop”图标
     * 
     * 跳转到商店页面（...js)
     * 
     */
    shop() {
        const { navigate } = this.props.navigation;
        navigate('Shop', { username: this.state.username });
    }

    /** 返回上一个页面 */
    goback() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    render() {

        var all_guns = [];

        this.state.guns.forEach((gun) => {
            //all_guns.push(<Gun name={gun.name} price={gun.price} Click_Gun={this.set_Using_Gun} />)
            all_guns.push({ name: gun.name, price: gun.price });
        })

        return (
            <ImageBackground style={base.background}
                source={require('../src/img/ppp0.jpg')}>
                <TouchableOpacity
                    activeOpacity={1.0}  //设置背景被点击时，透明度不变
                    style={{ flex: 1 }}>
                    <View style={header.container}>
                        <View style={header.header}>
                            <View style={header.Head}>
                                <Icon
                                    name={'md-arrow-round-back'}
                                    size={30}
                                    onPress={this.goback}
                                    style={{ color: '#8A8A8A' }}
                                />
                            </View>
                            <View style={header.End}>
                                <Fontisto
                                    style={{ color: '#8A8A8A', marginTop: 2 }}
                                    name={'shopify'}
                                    size={26}
                                    onPress={this.shop}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.gunList}>
                        <Text style={styles.info}>已装备的枪械：{this.state.using_gun}</Text>
                        <FlatList
                            numColumns={3}
                            data={all_guns}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            style={{ marginLeft: 20, marginTop: 5 }}
                        />
                    </View>

                </TouchableOpacity>
            </ImageBackground>
        );
    }

    _keyExtractor = ({ item, index }) => "index" + item;

    _renderItem = ({ item }) => {
        return (
            <View style={styles.innerItem}>
                <Gun name={item.name} price={''} Click_Gun={this.Buy_Gun} />
            </View>
        )
    }

};

const styles = StyleSheet.create({
    info: {
        fontSize: 20,
        color: '#CD9B1D',
        marginLeft: 30,
        fontWeight: 'bold',
    },
    gunList: {
        justifyContent: 'center',
    },
    innerItem: {
        width: (width - 80) / 3,
        height: (height - 100) / 2,
        marginLeft: 10,
        marginBottom: 10,
    }
})