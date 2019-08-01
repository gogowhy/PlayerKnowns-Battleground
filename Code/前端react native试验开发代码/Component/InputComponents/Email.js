import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Icon, Input, Label } from 'native-base';
import base from '../../src/style/base';

export default class Email extends Component {
    constructor() {
        super();
        this.state = {
            inputRef: null,
            value: '',
            isCorrect: 0,
        };
    }

    checkIfIsCorrect = () => {
        var expr_email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        var em = expr_email.test(this.state.value) || (this.state.value === ""); //邮箱检测
        if (this.state.value !== '' && em) {
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

        var email_line = "";
        if (this.state.isCorrect == 2) {
            email_line = "请输入正确的邮箱地址";
        }

        return (
            <Item style={{ borderBottomWidth: 0, flexDirection: 'column', width: 300 }}>
                <Item style={{ borderBottomWidth: 0 }}>
                    <Item 
                        rounded
                        style={base.inputBox}
                    >
                        <Icon
                            name="md-mail"
                            style={{fontSize: 26, marginLeft: -2}}
                        />
                        <Input
                            autoCorrect={false}
                            maxLength={100}
                            style={base.input}
                            blurOnSubmit={false}
                            returnKeyType="next"
                            ref={(ref) => { this.state.inputRef = ref; }}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder={'Email'}
                            onSubmitEditing={this.props.changeFocus}
                            onChangeText={this.updateText}
                            onEndEditing={this.checkIfIsCorrect}
                        />
                        {checkMarksArray[this.state.isCorrect]}
                    </Item>
                </Item>
                <Item style={base.checkIcon}>
                    <Label style={base.checkInfo}>{email_line}</Label>
                </Item>
            </Item>

        );
    }
}

Email.propTypes = {
    update: PropTypes.func.isRequired,
    changeFocus: PropTypes.func.isRequired,
};

