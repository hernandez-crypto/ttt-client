import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import '../../tests/config';

test('Smoke test for App component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.exists()).toBe(true);
});
