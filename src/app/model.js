import { getJSON, setJSON } from './helpers';

const defaultState = {
  active: false,
  user: '',
  sets: [
    {
      name: 'weight-loss',
      emoji: '🚀',
      color: '#FFE6CC',
      items: [
        {
          task: { content: 'Drink 8 glasses of water', completed: true },
          treat: { content: 'Have a fruit salad', completed: false },
        },
        {
          task: { content: 'Go for a 30-minute walk', completed: true },
          treat: { content: 'Enjoy a healthy smoothie', completed: true },
        },
        {
          task: { content: 'Eat a balanced meal', completed: true },
          treat: { content: 'Snack on nuts and seeds', completed: false },
        },
        {
          task: { content: 'Do some stretching exercises', completed: false },
          treat: {
            content: 'Reward yourself with a piece of dark chocolate',
            completed: true,
          },
        },
        {
          task: { content: 'Get at least 7 hours of sleep', completed: false },
          treat: { content: 'Relax with a cup of herbal tea', completed: true },
        },
      ],
    },
    {
      name: 'fitness',
      emoji: '💪',
      color: '#E5FCC2',
      items: [
        {
          task: { content: 'Do 20 push-ups', completed: true },
          treat: { content: 'Take a protein shake', completed: false },
        },
        {
          task: { content: 'Run 5 kilometers', completed: false },
          treat: { content: 'Replenish with a banana', completed: true },
        },
        {
          task: { content: 'Attend a yoga class', completed: false },
          treat: {
            content: 'Indulge in a refreshing smoothie',
            completed: false,
          },
        },
        {
          task: { content: 'Lift weights for 30 minutes', completed: true },
          treat: { content: 'Enjoy a protein bar', completed: false },
        },
        {
          task: { content: 'Do a HIIT workout', completed: false },
          treat: { content: 'Sip on coconut water', completed: true },
        },
      ],
    },
    {
      name: 'new-habit',
      emoji: '🎯',
      color: '#FFD6A5',
      items: [
        {
          task: { content: 'Read for 30 minutes', completed: false },
          treat: { content: 'Enjoy a cup of coffee', completed: true },
        },
        {
          task: {
            content: 'Practice mindfulness for 10 minutes',
            completed: true,
          },
          treat: { content: 'Take a short nap', completed: false },
        },
        {
          task: { content: 'Learn a new skill', completed: false },
          treat: { content: 'Watch your favorite TV show', completed: true },
        },
      ],
    },
    {
      name: 'productivity',
      emoji: '⏰',
      color: '#FFADAD',
      items: [
        {
          task: { content: 'Create a to-do list', completed: false },
          treat: { content: 'Listen to your favorite music', completed: true },
        },
        {
          task: { content: 'Organize your workspace', completed: true },
          treat: { content: 'Take a short walk outside', completed: false },
        },
        {
          task: { content: 'Prioritize tasks for the day', completed: false },
          treat: { content: 'Enjoy a healthy snack', completed: true },
        },
      ],
    },
    {
      name: 'mindfulness',
      emoji: '🧘',
      color: '#A0C4FF',
      items: [
        {
          task: {
            content: 'Practice deep breathing exercises',
            completed: true,
          },
          treat: { content: 'Meditate for 15 minutes', completed: false },
        },
        {
          task: { content: 'Practice gratitude journaling', completed: false },
          treat: { content: 'Enjoy a warm cup of tea', completed: true },
        },
        {
          task: { content: 'Go for a mindful walk', completed: true },
          treat: { content: 'Engage in a creative activity', completed: false },
        },
      ],
    },
    {
      name: 'self-care',
      emoji: '🛁',
      color: '#CBF0F8',
      items: [
        {
          task: { content: 'Take a relaxing bath', completed: false },
          treat: { content: 'Apply a face mask', completed: true },
        },
        {
          task: { content: 'Read a book in a cozy spot', completed: true },
          treat: { content: 'Listen to calming music', completed: false },
        },
        {
          task: { content: 'Practice positive affirmations', completed: false },
          treat: { content: 'Savor a piece of chocolate', completed: true },
        },
      ],
    },
  ],
};

const _setCompletedValue = (sets) => {
  sets.map((set) => {
    set.completed = _countCompletedTasks(set);
  });
};

const _countCompletedTasks = (set) => {
  const count = set.items.reduce((acc, curr) => {
    if (curr.task.completed === true) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  return count;
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

export const loadItem = (itemName) => {
  let data = false;

  if (!state.active) return data;

  state.sets.map((item) => {
    if (item.name === itemName) data = item;
  });

  return data;
};

const init = () => {
  let stateData = getJSON('state');

  if (!stateData) stateData = defaultState;

  _setCompletedValue(stateData.sets);

  state = stateData;
  setJSON('state', state);
};

init();
