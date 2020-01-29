import React from 'react';
import LoginForm from './LoginForm';
import { shallow } from 'enzyme';
import '../../tests/config';

test('Smoke test for LoginForm component', () => {
  const wrapper = shallow(<LoginForm />);
  expect(wrapper.exists()).toBe(true);
});
