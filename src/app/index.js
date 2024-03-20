import '../main.css';
import StartView from './views/startView';
import SetsView from './views/setsView';
import ItemView from './views/itemView';
import * as model from './model';

const controlStart = () => {
  return model.loadState();
};

const controlStartForm = (data) => {
  model.updateState('user', data);

  SetsView.handleStart(controlStart, controlFormAddSet);
};

const controlItem = () => {
  const id = window.location.hash.slice(1);

  if (!id) return;

  if (!model.loadItem(id)) return;

  return model.loadItem(id);
};

const controlFormAddSet = (data) => {
  model.addItem(data);
  SetsView.handleStart(controlStart, controlFormAddSet);
};

const controlFormAddItem = (data) => {
  model.addSetItem(data);
  ItemView.renderView(controlItem, controlBackBtn, controlFormAddItem);
};

const controlBackBtn = () => {
  SetsView.handleStart(controlStart, controlFormAddSet);
};

const init = () => {
  StartView.handleStart(controlStart, controlStartForm);
  SetsView.handleStart(controlStart, controlFormAddSet);
  ItemView.handleStart(controlItem, controlBackBtn, controlFormAddItem);
};

init();
