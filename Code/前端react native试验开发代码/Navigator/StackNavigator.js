/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';


import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Home from '../Component/Home';
import Login from '../Component/Login';
import Register from '../Component/Register';
import MainPage from '../Component/MainPage';
import Room from '../Component/Room';
import EnterRoom_inputID from '../Component/EnterRoom_inputID';

const RootStack1 = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        header: null,  //隐藏导航栏标题
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
      header: null,  //隐藏导航栏标题
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
      header: null,  //隐藏导航栏标题
    }
  },
  MainPage: {
    screen: MainPage,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
      header: null,  //隐藏导航栏标题
    }
  },
  Room: {
    screen: Room,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
      header: null,  //隐藏导航栏标题
    }
  },
  EnterRoom_inputID: {
    screen: EnterRoom_inputID,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
      header: null,  //隐藏导航栏标题
    }
  },
});

const RootStack = createAppContainer(RootStack1);

export default RootStack;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});
