import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from 'antd-mobile-rn';
import Register from './Component/Register.js';
import Login from './Component/Login.js';
import End from './Component/End.js';

export default class HelloWorldApp extends Component {
  render() {


            return (

              <View style={styles.container}>

                       <Register />
              </View>
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