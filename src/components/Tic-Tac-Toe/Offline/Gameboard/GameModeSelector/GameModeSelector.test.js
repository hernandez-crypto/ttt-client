import React from 'react';
import GameModeSelector from './GameModeSelector';
import { shallow } from 'enzyme';
import '../../../../../tests/config';

test('Smoke test for GameModeSelector component', () => {
  const props = {
    Computer: 1,
    selectBotDifficulty: () => {}
  };
  const wrapper = shallow(<GameModeSelector {...props} />);
  expect(wrapper.exists()).toBe(true);
});
