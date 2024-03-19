export default class View {
  _containerElement = document.querySelector('main');
  _markup;

  _clearContainer = () => {
    this._containerElement.innerHTML = '';
  };

  _renderMarkUp = () => {
    this._clearContainer();
    this._containerElement.innerHTML = this._markup;
    this._scrollToTop();
  };

  _scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
}
