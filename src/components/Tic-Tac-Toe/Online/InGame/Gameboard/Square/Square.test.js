import React from 'react';
import Square from './Square';
import { shallow } from 'enzyme';
import '../../../../../../tests/config';

test('Smoke test for Square component', () => {
  const props = {
    setChoice: () => {},
    id: 1,
    currentValue: null
  };
  const wrapper = shallow(<Square {...props} />);
  expect(wrapper.exists()).toBe(true);
});
