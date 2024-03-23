import { scrollToTop, clearElement } from '../helpers';

export default class View {
  _containerElement = document.querySelector('main');
  _markup;
  _overlayMarkUp = `<div id="mainOverlay" class="bg-black bg-opacity-60 fixed h-screen top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4"></div> `;
  _formValidArray = [];

  _clearContainer = () => {
    clearElement(this._containerElement);
  };

  _renderMarkUp = (update = false) => {
    this._clearContainer();
    this._containerElement.innerHTML = this._markup;
    if (!update) scrollToTop();
  };

  _renderOverlayMarkUp = () => {
    const overlayContainer = document.querySelector('main');
    overlayContainer.insertAdjacentHTML('beforeend', this._overlayMarkUp);
  };

  _renderOverlay = (markup) => {
    this._renderOverlayMarkUp();

    const overlay = document.querySelector('#mainOverlay');
    overlay.insertAdjacentHTML('beforeend', markup);
  };

  _removeOverlay = () => {
    const overlay = document.querySelector('#mainOverlay');
    clearElement(overlay);
    overlay.remove();
  };

  _monitorOverlayClose = (closeBtnID) => {
    const overlay = document.querySelector('#mainOverlay');
    const closeBtn = document.querySelector(`#${closeBtnID}`);

    overlay.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this._removeOverlay();
      }
    });

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this._removeOverlay();
    });
  };
}
