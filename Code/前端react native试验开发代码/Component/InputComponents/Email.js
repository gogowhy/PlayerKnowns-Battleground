import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Icon, Input, Label } from 'native-base';

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
                    <Item rounded
                        style={{
                            width: 300,
                            height: 38,
                            marginTop: 2,
                            backgroundColor: '#fff',
                        }}
                    >
                        <Icon
                            name="md-mail"
                            style={{
                                fontSize: 26, marginLeft: -2,
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
                <Item style={{ borderBottomWidth: 0, height: 14, justifyContent: 'center', alignSelf: 'flex-end' }}>
                    <Label style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>{email_line}</Label>
                </Item>
            </Item>

        );
    }
}

Email.propTypes = {
    update: PropTypes.func.isRequired,
    changeFocus: PropTypes.func.isRequired,
};

