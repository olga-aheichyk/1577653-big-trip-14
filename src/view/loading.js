import AbstractClassView from './abstract-class.js';

const createLoadingTemplate = () => {
  return '<p class="trip-events__msg">Loading...</p>';
};

export default class Loading extends AbstractClassView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
