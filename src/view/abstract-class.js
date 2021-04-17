import { createDOMElementFromMarkup } from '../util.js';

export default class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElementFromMarkup(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}