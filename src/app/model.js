import { LOCAL_DATA_KEY } from './config';
import { getJSON, setJSON, convertToSlug, getHash } from './helpers';

// Functions
// // Internal functions
const _updateCompletedSetsCount = () => {
  state.sets.forEach((set) => {
    set.completed = _countCompletedTasks(set);
  });
};

const _countCompletedTasks = (set) => {
  return set.items.reduce((acc, curr) => {
    if (curr.task.completed) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const _activateState = () => {
  state.active = true;
};

const _addNewSet = (set) => {
  state.sets.push(set);

  _updateCompletedSetsCount();

  setJSON(LOCAL_DATA_KEY, state);
};

const _addNewItem = (item) => {
  const currSet = getHash();

  if (!currSet) return;

  state.sets.forEach((set) => {
    if (set.title === currSet) {
      set.items.push(item);
    }
  });

  _updateCompletedSetsCount();

  setJSON(LOCAL_DATA_KEY, state);
};

const _setItemStatus = (type, index, status) => {
  const currSet = getHash();

  if (!currSet) return;

  state.sets.forEach((set) => {
    if (set.title === currSet) {
      set.items[index][type].completed = status;
    }
  });

  _updateCompletedSetsCount();

  setJSON(LOCAL_DATA_KEY, state);
};

// // Exported functions
export const defineStateUser = (data) => {
  const { name } = data;

  state.user = name;

  _activateState();

  setJSON(LOCAL_DATA_KEY, state);
};

export const loadStateData = () => {
  if (!state.active) return false;

  return state;
};

export const loadSetData = (title) => {
  if (!state.active) return false;

  if (!title) return false;

  let setData;

  state.sets.forEach((set) => {
    if (set.title === title) {
      setData = set;
    }
  });

  return setData;
};

export const defineNewSet = (data) => {
  let { title, emoji, color } = data;

  title = convertToSlug(title);

  const newSet = {
    title: title,
    emoji: emoji,
    color: color,
    items: [],
  };

  _addNewSet(newSet);
};

export const defineNewItem = (data) => {
  let { task, treat } = data;

  task = task.trim();
  treat = treat.trim();

  const newItem = {
    task: { content: `${task}`, completed: false },
    treat: { content: `${treat}`, completed: false },
  };

  _addNewItem(newItem);
};

export const updateItemStatus = (data) => {
  const { type, index, status } = data;

  _setItemStatus(type, index, status);
};

// Variables
let state = {};

const defaultState = {
  active: false,
  user: '',
  sets: [
    {
      title: 'weight-loss',
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
      title: 'fitness',
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
      title: 'new-habit',
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
      title: 'productivity',
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
      title: 'mindfulness',
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
      title: 'self-care',
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

// Initialization
const init = () => {
  let stateData = getJSON(LOCAL_DATA_KEY);

  if (!stateData) stateData = defaultState;

  state = stateData;

  _updateCompletedSetsCount();

  setJSON(LOCAL_DATA_KEY, state);
};

init();
