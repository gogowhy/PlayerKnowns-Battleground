import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Icon, Input, Label } from 'native-base';
import base from '../../src/style/base';

export default class Password extends Component {
  constructor() {
    super();
    this.state = {
      inputRef: null,
      value: '',
      isCorrect: 0,
    };
  }

  checkIfIsCorrect = () => {
    if (this.state.value !== '') {
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
    let keyType = 'done';
    if (this.props.special) {
      keyType = 'next';
    }

    const checkMarksArray = [
      (null),
      (<Icon name="ios-checkmark-circle" />),
      (<Icon name="ios-close-circle" />),
    ];

    return (
      <Item style={{ borderBottomWidth: 0, flexDirection: 'column', width: 300 }}>
        <Item style={{ borderBottomWidth: 0 }}>
          <Item rounded
            style={base.inputBox}
          >
            <Icon
              name="md-lock"
              style={{
                fontSize: 30, marginLeft: 3,
              }}
            />
            <Input
              autoCorrect={false}
              maxLength={100}
              style={base.input}
              blurOnSubmit={!this.props.special}
              //returnKeyType={keyType}
              ref={(ref) => { this.state.inputRef = ref; }}
              autoCapitalize="none"
              placeholder={'Password'}
              onSubmitEditing={this.props.changeFocus}
              secureTextEntry
              onChangeText={this.updateText}
              onEndEditing={this.checkIfIsCorrect}
            />
            {checkMarksArray[this.state.isCorrect]}
          </Item>
        </Item>
        <Item style={base.checkIcon}>
          <Label style={base.checkInfo}>{""}</Label>
        </Item>
      </Item>
    );
  }
}

Password.propTypes = {
  update: PropTypes.func.isRequired,
  changeFocus: PropTypes.func.isRequired,
  special: PropTypes.bool,
};

Password.defaultProps = {
  special: false,
};
