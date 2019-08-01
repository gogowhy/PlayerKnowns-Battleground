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

import Home from '../Component/Home';
import Login from '../Component/Login';
import Register from '../Component/Register';
import GameHome from '../Component/MainPage';
import Room from '../Component/Room';
import EnterRoom_inputID from '../Component/EnterRoom_inputID';
import Gaming from '../Component/Gaming';
import Result from '../Component/Result';
import Change_Password from '../Component/Change_Password';
import Camera11 from '../Component/Camera';

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
  Change_Password: {
    screen: Change_Password,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
      header: null,  //隐藏导航栏标题
    }
  },
  MainPage: {
    screen: GameHome,
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
  Gaming: {
    screen: Gaming,
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
  Result: {
    screen: Result,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
      header: null,  //隐藏导航栏标题
    }
  },
  Map: {
    screen: Map,
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
      header: null,  //隐藏导航栏标题
    }
  }
});

const RootStack = createAppContainer(RootStack1);

export default RootStack;
