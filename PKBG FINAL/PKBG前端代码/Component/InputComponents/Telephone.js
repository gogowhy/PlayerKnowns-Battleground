import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Icon, Input, Label } from 'native-base';
import base from '../../src/style/base';

export default class Telephone extends Component {
    constructor() {
        super();
        this.state = {
            inputRef: null,
            value: '',
            isCorrect: 0,
        };
    }

    checkIfIsCorrect = () => {
        var expr_phone = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        var ph = expr_phone.test(this.state.value) || (this.state.value === ""); //手机号检测
        if (this.state.value !== '' && ph) {
            this.state.isCorrect = 1;
        } else {
            this.state.isCorrect = 2;
        }
        this.setState(this.state);
        this.props.update();
    };

    clearInput = () => {
        this.state.inputRef._root.setNativeProps({ text: '' }); // eslint-disable-line
        this.setState({ isCorrect: 0, value: '' });
    };

    updateText = (value) => {
        this.state.value = value;
    };

    render() {
        const checkMarksArray = [
            (null),
            (<Icon name="ios-checkmark-circle" />),
            (<Icon name="ios-close-circle" />),
        ];

        var phone_line = "";
        if (this.state.isCorrect == 2) {
            phone_line = "请输入正确的手机号码";
        }

        return (
            <Item style={{ borderBottomWidth: 0, flexDirection: 'column', width: 300 }}>
                <Item style={{ borderBottomWidth: 0 }}>
                    <Item rounded
                        style={base.inputBox}
                    >
                        <Icon
                            name="ios-phone-portrait"
                            style={{
                                fontSize: 30, marginLeft: 8,
                            }}
                        />
                        <Input
                            autoCorrect={false}
                            maxLength={100}
                            style={base.input}
                            blurOnSubmit
                            returnKeyType="done"
                            ref={(ref) => { this.state.inputRef = ref; }}
                            keyboardType="number-pad"
                            placeholder={'Telephone'}
                            onSubmitEditing={this.props.changeFocus}
                            onChangeText={this.updateText}
                            onEndEditing={this.checkIfIsCorrect}
                        />
                        {checkMarksArray[this.state.isCorrect]}
                    </Item>
                </Item>
                <Item style={base.checkIcon}>
                    <Label style={base.checkInfo}>{phone_line}</Label>
                </Item>
            </Item>
        );
    }
}

Telephone.propTypes = {
    update: PropTypes.func.isRequired,
    changeFocus: PropTypes.func.isRequired,
};
