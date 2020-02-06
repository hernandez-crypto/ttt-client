import React from 'react';
import LandingPage from './LandingPage';
import { shallow } from 'enzyme';
import '../../tests/config';

test('Smoke test for LandingPage component', () => {
  const wrapper = shallow(<LandingPage />);
  expect(wrapper.exists()).toBe(true);
});
