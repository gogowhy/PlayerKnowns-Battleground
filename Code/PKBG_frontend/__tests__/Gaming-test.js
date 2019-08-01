/**
 * @format
 */

import 'react-native';
import React from 'react';
import Gaming from '../Component/Gaming';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Gaming />).toJSON();
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
