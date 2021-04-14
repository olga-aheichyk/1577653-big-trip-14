import { createDOMElementFromMarkup } from '../util.js';

const createNewEventCreationTemplate = () => {
  return `
  <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
};

export default class NewEvent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNewEventCreationTemplate();
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
