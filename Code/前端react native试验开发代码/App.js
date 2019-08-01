import React, { Component } from "react";
import { StatusBar , View } from "react-native";
import Orientation from 'react-native-orientation';
import RootStack from './Navigator/StackNavigator.js';

export default class App extends Component {
  componentWillMount() {
    Orientation.lockToLandscape(); //强制横屏
    //Orientation.lockToPortrait();  //强制竖屏
  }
  
  render() {
        return (
          <View style={{flex: 1}}>
            {/* 隐藏状态栏 */}
            <StatusBar
              backgroundColor="#ff0000"
              translucent={true}
              hidden={true}
              animated={true}
            />
            <RootStack/>
          </View>
        );
  }
}