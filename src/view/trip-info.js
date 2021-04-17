import AbstractClassView from './abstract-class.js';

const createTripInfoTemplate = () => {
  return `
    <section class="trip-main__trip-info  trip-info"></section>
  `;
};

export default class TripInfo extends AbstractClassView {
  getTemplate() {
    return createTripInfoTemplate();
  }
}
