import React from 'react';
import TicTacToe from './Tic-Tac-Toe';
import { shallow } from 'enzyme';
import '../../../tests/config';

test('Smoke test for TicTacToe component', () => {
  const wrapper = shallow(<TicTacToe />);
  expect(wrapper.exists()).toBe(true);
});
