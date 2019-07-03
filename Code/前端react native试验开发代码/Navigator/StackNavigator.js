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

import Login from '../Component/Login';
import Register from '../Component/Register';

const RootStack1 = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        headerTitle: '登录',  //设置导航栏标题
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        headerTitle: '注册',  //设置导航栏标题
    }
  }
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
