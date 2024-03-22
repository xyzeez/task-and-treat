import '../main.css';
import { getHash, clearHash } from './helpers';
import StartView from './views/startView';
import SetsView from './views/setsView';
import ItemView from './views/itemView';
import * as model from './model';

// Functions
const monitorHash = () => {
  window.addEventListener('hashchange', () => {
    controlApp();
  });
};

const controlApp = () => {
  const id = getHash();
  const { active } = model.loadStateData();

  if (id) {
    active ? controlItemView(id) : clearHash();
  } else {
    active ? controlSetsView() : controlStartView();
  }
};

const controlStartView = () => {
  StartView.addHandler(model.defineStateUser, controlSetsView);
};

const controlSetsView = () => {
  const { user, sets } = model.loadStateData();
  SetsView.addHandler(user, sets, model.defineNewSet, controlSetsView);
};

const controlItemStatusList = (data) => {
  model.updateItemStatus(data);
};

const controlDeleteItemList = (itemIndex) => {
  model.deleteListItem(itemIndex);
};

const controlItemView = (id) => {
  const set = model.loadSetData(id);

  // TODO: Handle error for unavailable set of given id
  if (!set) {
    clearHash();
    return;
  }

  ItemView.addHandler(
    set,
    model.defineNewItem,
    controlItemStatusList,
    controlDeleteItemList,
    controlItemView
  );
};

// Initialization
const init = () => {
  controlApp();
  monitorHash();
};

init();
