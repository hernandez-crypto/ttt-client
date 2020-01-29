import React from 'react';
import RegistrationForm from './RegistrationForm';
import { shallow } from 'enzyme';
import '../../tests/config';

test('Smoke test for RegistrationForm component', () => {
  const wrapper = shallow(<RegistrationForm />);
  expect(wrapper.exists()).toBe(true);
});
