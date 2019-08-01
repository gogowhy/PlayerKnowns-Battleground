/**
 * @format
 */

import 'react-native';
import React from 'react';
import SectionView from '../Component/SectionView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<SectionView />).toJSON();
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
