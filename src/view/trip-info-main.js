import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);
import { createDOMElementFromMarkup } from '../util.js';

const createTripInfoMainTemplate = (points) => {
  if (points) {
    const tripCitiesArray = points.map((point) => {
      return point.info.name;
    });

    const tripCitiesSet = new Set(tripCitiesArray);
    const uniqueTripCities = Array.from(tripCitiesSet).join(' &mdash; ');

    const arrayFromStartDates = points.map((point) => dayjs(point.dateFrom));
    const arrayFromEndDates = points.map((point) => dayjs(point.dateTo));

    const startTripDay = dayjs.min(arrayFromStartDates).format('MMM DD');
    const endTripDay = dayjs.max(arrayFromEndDates).format('MMM DD');

    return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${uniqueTripCities}</h1>
      <p class="trip-info__dates">${startTripDay}&nbsp;&mdash;&nbsp;${endTripDay}</p>
    </div>
    `;
  }

  return '';
};

export default class TripInfoMain {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._points);
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
