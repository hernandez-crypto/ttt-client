import React from 'react';
import GameForm from './GameForm';
import { shallow } from 'enzyme';
import '../../../../tests/config';

test('Smoke test for GameForm component', () => {
  const wrapper = shallow(<GameForm />);
  expect(wrapper.exists()).toBe(true);
});
