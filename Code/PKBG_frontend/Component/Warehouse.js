import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    ImageBackground,
    Image,
    SectionList,
    Dimensions,
    FlatList
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
            using_gun:'M16',
        }
        this.set_Using_Gun = this.set_Using_Gun.bind(this);
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
                    guns : response.data.guns,
                    using_gun : response.data.using_gun
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


    async set_Using_Gun(gun_name){
        
        const _this = this;

        const url = "http://49.234.27.75:2001/user/equip";

        let data = {
            username: _this.state.username,
            weapon:gun_name
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
            case 0: this.setState({ using_gun : gun_name }); break;
            case 1: alert("未响应！"); break;
            case -2: alert("服务器异常！"); break;
            case -1: alert("设置错误，请稍后重试。");break;
            
        }
        
    }

    render() {

        var all_guns = [];
        
        this.state.guns.forEach((gun) => {
            all_guns.push(<Gun name={gun.weapon} Click_Gun={this.set_Using_Gun} />)
            //all_guns.push(gun.name);
        })

        return (
            <View>
            <Text>已装备的枪械:{this.state.using_gun}</Text>
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