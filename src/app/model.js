import { getJSON, setJSON } from './helpers';

const defaultState = {
  active: false,
  user: '',
  sets: [
    {
      name: 'weight-loss',
      emoji: '🚀',
      color: '#FFE6CC',
      completed: 3,
    },
    {
      name: 'fitness',
      emoji: '💪',
      color: '#FFF5E1',
      completed: 5,
    },
    {
      name: 'diet',
      emoji: '🥗',
      color: '#E8F5E9',
      completed: 2,
    },
    {
      name: 'cardio',
      emoji: '🏃‍♂️',
      color: '#E3F2FD',
      completed: 4,
    },
    {
      name: 'strength-training',
      emoji: '🏋️‍♂️',
      color: '#F3E5F5',
      completed: 6,
    },
  ],
};

let state = {};

export const loadState = () => {
  return state;
};

export const updateState = (item, data) => {
  state[item] = data;
  state.active = true;
  setJSON('state', state);
};

const init = () => {
  let stateData = getJSON('state');

  if (!stateData) stateData = defaultState;

  state = stateData;
  setJSON('state', state);
};

init();
