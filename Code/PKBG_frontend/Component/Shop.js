import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    ImageBackground,
    Image
} from 'react-native';
import { Form, Button } from 'native-base';
import base from '../src/style/base';
import header from '../src/style/header';
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import axios from 'axios';
import RoomID from './InputComponents/RoomID';
import Password from './InputComponents/Password';

import Gun from './Gun';
/** 测试用房间ID和房间密码 */


/** 定义了同后端传递和接收指令的 Code 用来处理不同种类的 登录的响应状态 */


/* 组件 : EnterRoom_inputID
-- 作用 : 收集用户加入某房间的ID及Password，使其加入房间
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
                    guns : response.data.guns,
                    gold : response.data.gold
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

    render() {

        var all_guns = [];
        
        this.state.guns.forEach((gun) => {
            all_guns.push(<Gun name={gun.name} price={gun.price} Click_Gun={this.Buy_Gun} />)
            //all_guns.push(gun.name);
        })

        return (
            <View>
            <Text>所持有的金币:{this.state.gold}</Text>
            {all_guns}
            
            </View>
        );
    }



};

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })