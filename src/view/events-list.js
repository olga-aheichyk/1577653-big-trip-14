import AbstractClassView from './abstract-class.js';

const createEventsListTemplate = () => {
  return `
  <ul class="trip-events__list"></ul>
  `;
};

export default class EventsList extends AbstractClassView {
  getTemplate() {
    return createEventsListTemplate();
  }
}

