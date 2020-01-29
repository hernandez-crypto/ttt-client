import React from 'react';
import Board from './Board';
import { shallow } from 'enzyme';
import '../../../../../tests/config';

test('Smoke test for Board component', () => {
  const props = {
    board: ['X', 1, 2, 3, 4, 5, 6, 7, 8],
    setChoice: () => {}
  };
  const wrapper = shallow(<Board {...props} />);
  expect(wrapper.exists()).toBe(true);
});
