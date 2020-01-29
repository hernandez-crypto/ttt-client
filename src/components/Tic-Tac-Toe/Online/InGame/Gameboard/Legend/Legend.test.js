import React from 'react';
import Legend from './Legend';
import { shallow } from 'enzyme';
import '../../../../../../tests/config';

test('Smoke test for Legend component', () => {
  const props = {
    playerOne: 1,
    playerTwo: 2,
    currentPlayer: 1,
    roomName: '343VD@DVSD',
    round: 3
  };
  const wrapper = shallow(<Legend {...props} />);
  expect(wrapper.exists()).toBe(true);
});
