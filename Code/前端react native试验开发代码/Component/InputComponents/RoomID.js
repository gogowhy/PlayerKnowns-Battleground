import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, Icon, Input, Label } from 'native-base';
import base from '../../src/style/base';

export default class Name extends Component {
  constructor() {
    super();
    this.state = {
      inputRef: null,
      value: '',
      isCorrect: 0,
    };
  }

  onValueChanged(n) {
    this.setState(
      { value: n }
    )
  };

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

    const checkMarksArray = [
      (null),
      (<Icon name="ios-checkmark-circle" />),
      (<Icon name="ios-close-circle" />),
    ];

    return (
      <Item style={{ borderBottomWidth: 0, flexDirection: 'column', width: 300 }}>
        <Item style={{ borderBottomWidth: 0, marginTop: 20 }}>
          <Item rounded
            style={base.inputBox}>
            <Icon
              name="md-home"
              style={{
                fontSize: 30, marginLeft: -1,
              }}
            />
            <Input
              autoCorrect={false}
              maxLength={100}
              style={base.input}
              blurOnSubmit={false}
              //returnKeyType="next"
              ref={(ref) => { this.state.inputRef = ref; }}
              //editable={this.props.shown}
              placeholder={'RoomID'}
              keyboardType="number-pad"
              onSubmitEditing={this.props.changeFocus}
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

Name.propTypes = {
  update: PropTypes.func.isRequired,
  changeFocus: PropTypes.func.isRequired,
  //shown: PropTypes.bool.isRequired,
};
