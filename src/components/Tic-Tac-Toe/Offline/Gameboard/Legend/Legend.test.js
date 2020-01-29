import React from 'react';
import Legend from './Legend';
import { shallow } from 'enzyme';
import '../../../../../tests/config';

test('Smoke test for Legend component', () => {
  const props = {
    currentPlayer: 1,
    playerOne: 4,
    playerTwo: 3,
    round: 7
  };
  const wrapper = shallow(<Legend {...props} />);
  expect(wrapper.exists()).toBe(true);
});
