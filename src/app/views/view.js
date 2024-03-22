import { scrollToTop } from '../helpers';

export default class View {
  _containerElement = document.querySelector('main');
  _markup;
  _formValidArray = [];

  _clearContainer = () => {
    this._containerElement.innerHTML = '';
  };

  _renderMarkUp = (update = false) => {
    this._clearContainer();
    this._containerElement.innerHTML = this._markup;
    if (!update) scrollToTop();
  };
}
