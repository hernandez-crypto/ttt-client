import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';
import '../../tests/config';

test('Smoke test for Header component', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.exists()).toBe(true);
});
