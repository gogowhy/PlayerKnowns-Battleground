import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    Image,
    StyleSheet,
    Text
} from 'react-native';
import { Button } from 'native-base';

export default class Gun extends Component {

    constructor(props){
        super(props);
        this.state = {
            name : this.props.name,
            price : this.props.price
        }
        this.Click_Gun = this.Click_Gun.bind(this);
    }

    Click_Gun(){
        this.props.Click_Gun(this.state.name);
    }

    render(){
        return(
            <Button onPress={this.Click_Gun}>
                <Text>
                    {this.state.name}{this.state.price}
                </Text>
            </Button>
        )
    }
}