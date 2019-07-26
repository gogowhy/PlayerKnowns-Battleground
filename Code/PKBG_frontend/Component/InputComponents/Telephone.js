import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Icon, Input, Label } from 'native-base';

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
                        style={{
                            width: 300,
                            height: 38,
                            marginTop: 2,
                            backgroundColor: '#fff',
                        }}
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
                            style={{
                                paddingBottom: 6,
                                fontWeight: '400',
                                fontSize: 18,
                                height: 38,
                                paddingLeft: 16,
                            }}
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
                <Item style={{ borderBottomWidth: 0, height: 14, justifyContent: 'center', alignSelf: 'flex-end' }}>
                    <Label style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{phone_line}</Label>
                </Item>
            </Item>
        );
    }
}

Telephone.propTypes = {
    update: PropTypes.func.isRequired,
    changeFocus: PropTypes.func.isRequired,
};
