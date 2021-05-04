import AbstractClass from './abstract-class.js';

export default class SmartClass extends AbstractClass {
  constructor() {
    super();

    this._point = {};
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._point = Object.assign(
      {},
      this._point,
      update,
    );

    this.updateElement();
  }
}
