import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    ImageBackground,
    FlatList,
    Dimensions
} from 'react-native';
import { Form, Button, Icon, Item } from 'native-base';
import Entypo from "react-native-vector-icons/Entypo";
import base from '../src/style/base';
import header from '../src/style/header';
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


/* 组件 : Shop
-- 作用 : 商城购买枪械
*/
export default class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.navigation.state.params.username,
            guns: [],
            gold: 1000
        }
        this.Buy_Gun = this.Buy_Gun.bind(this);
        this.warehouse = this.warehouse.bind(this);
        this.goback = this.goback.bind(this);
    }

    async componentDidMount() {

        const _this = this;

        const url = "http://49.234.27.75:2001/user/getmarket";

        let data = {
            username: _this.state.username
        }

        var code = 1;
        await axios.post(url, data)
            .then(function (response) {
                // handle success

                _this.setState({
                    guns: response.data.guns,
                    gold: response.data.gold
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


    async Buy_Gun(gun_name){
        
        var price = 0;
        var gold = this.state.gold;
        this.state.guns.forEach((gun) => {
            if(gun_name == gun.name) {
                price = gun.price;
                return;
            }
        })

        if(price == 0) { alert("出错了！请稍后重试。");return; }

        if(gold < price) { alert("余额不足!您仍需"+(price-gold)+"金币。");return; }

        const _this = this;

        const url = "http://49.234.27.75:2001/user/buy";

        let data = {
            username: _this.state.username,
            weapon:gun_name
        }

        var code = 1;
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
            case 0: this.setState({ gold : gold - price }); break;
            case 1: alert("未响应！"); break;
            case -2: alert("服务器异常！"); break;
            case -1: alert("购买失败。该物品您已拥有。");break;
            
        }
        
    }

    /** 
     * 功能 ：进入仓库
     * 触发 ：点击“warehouse”图标
     * 
     * 跳转到仓库页面（...js)
     * 
     */
    warehouse() {
        const { navigate } = this.props.navigation;
        navigate('Warehouse', { username: this.state.username });
    }

    /** 返回上一个页面 */
    goback() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    render() {

        var all_guns = [];

        this.state.guns.forEach((gun) => {
            //all_guns.push(<Gun name={gun.name} price={gun.price} Click_Gun={this.Buy_Gun} />)
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
                                <Entypo
                                    style={{ color: '#8A8A8A' }}
                                    name={'shop'}
                                    size={30}
                                    onPress={this.warehouse}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.gunList}>
                        <Text style={styles.gold}>所持有的金币：{this.state.gold}</Text>
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
                <Gun name={item.name} price={item.price} Click_Gun={this.Buy_Gun} />
            </View>
        )
    }

};

const styles = StyleSheet.create({
    gold: {
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