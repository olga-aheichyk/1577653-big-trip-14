import { createDOMElementFromMarkup } from '../util.js';

const createEventsListTemplate = () => {
  return `
  <ul class="trip-events__list"></ul>
  `;
};

export default class EventsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsListTemplate();
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

