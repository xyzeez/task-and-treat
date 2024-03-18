import '../main.css';
import StartView from './views/startView';
import SetsView from './views/setsView';
import * as model from './model';

const controlStart = () => {
  return model.loadState();
};

const controlStartForm = (data) => {
  model.updateState('user', data);

  SetsView.renderView(model.loadState());
};

const init = () => {
  StartView.handleStart(controlStart, controlStartForm);
  SetsView.handleStart(controlStart);
};

init();
