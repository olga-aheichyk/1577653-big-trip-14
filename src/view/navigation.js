import { NavigationItem } from '../const.js';
import AbstractClassView from './abstract-class.js';

const createNavigationTemplate = () => {
  return `
  <nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${NavigationItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#">${NavigationItem.STATS}</a>
  </nav>
  `;
};

export default class Navigation extends AbstractClassView {
  constructor() {
    super();

    this._handleNavigationClick = this._handleNavigationClick.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate();
  }

  _handleNavigationClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'A') {
      return;
    }

    this._callback.navigationClick(evt.target.textContent);

    const activeNavButton = this.getElement().querySelector('.trip-tabs__btn--active');
    activeNavButton.classList.remove('trip-tabs__btn--active');
    evt.target.classList.add('trip-tabs__btn--active');
  }

  setNavigationClickHandler(callback) {
    this._callback.navigationClick = callback;
    this.getElement().addEventListener('click', this._handleNavigationClick);
  }

  // setMenuItem(menuItem) {
  //   const item = this.getElement().querySelector(`[value=${menuItem}]`);

  //   if (item !== null) {
  //     item.checked = true;
  //   }
  // }
}


