/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import EnterRoom_inputID from '../Component/EnterRoom_inputID';




test('renders correctly', () => {
   
    const n = {
        state : {
            params : {
                username : 'aaa'
            }
        }
    }

  const tree = renderer.create(<EnterRoom_inputID navigation={n}  />).toJSON();
  expect(tree).toMatchSnapshot();
});
/*
import React from 'react';
import Intro from '../Intro';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});*/
