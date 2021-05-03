import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);
import AbstractClassView from './abstract-class.js';
import { sortByDateAscending } from '../utils/data-processing.js';

const createTripInfoMainTemplate = (points) => {
  if (points) {
    const tripCitiesArray = points
      .sort((a, b) => sortByDateAscending(a, b))
      .map((point) => {
        return point.info.name;
      });

    // const tripCitiesSet = new Set(tripCitiesArray);
    // const uniqueTripCities = Array.from(tripCitiesSet);

    let title;

    if (tripCitiesArray.length > 3) {
      title = `${tripCitiesArray[0]} &mdash; ... &mdash; ${tripCitiesArray[tripCitiesArray.length - 1]}`;
    }

    else {
      title = Array.from(new Set(tripCitiesArray))
        .join(' &mdash; ');
    }

    const arrayFromStartDates = points.map((point) => dayjs(point.dateFrom));
    const arrayFromEndDates = points.map((point) => dayjs(point.dateTo));

    const startTripDay = dayjs.min(arrayFromStartDates).format('MMM DD');
    const endTripDay = dayjs.max(arrayFromEndDates).format('MMM DD');

    return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>
      <p class="trip-info__dates">${startTripDay}&nbsp;&mdash;&nbsp;${endTripDay}</p>
    </div>
    `;
  }

  return '';
};

export default class TripInfoMain extends AbstractClassView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._points);
  }
}
