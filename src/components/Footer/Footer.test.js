import React from 'react';
import Footer from './Footer';
import { shallow } from 'enzyme';
import '../../tests/config';

test('Smoke test for Footer component', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.exists()).toBe(true);
});
