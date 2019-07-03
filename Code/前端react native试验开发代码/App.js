import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Orientation from 'react-native-orientation';
import { Button } from 'antd-mobile-rn';
import End from './Component/End.js';
import Home from './Component/Home.js';
import RootStack from './Navigator/StackNavigator.js'

export default class App extends Component {

  componentWillMount() {
         Orientation.lockToLandscape(); //强制横屏
         //Orientation.lockToPortrait();  //强制竖屏
  }

  render() {
        return (
            <RootStack />
        );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  thumbnail: {
    width: 200,
    height: 81
  }
});