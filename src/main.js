import { createTripInfoMainTemplate } from './view/trip-info-main.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createTripInfoCostTemplate } from './view/trip-info-cost.js';
import { createNavigationTemplate } from './view/navigation.js';
import { createTripFiltersTemplate } from './view/trip-filters.js';
import { createTripSortTemplate } from './view/trip-sort.js';
import { createTripEventsListTemplate } from './view/trip-events-list.js';
import { createTripEventsItemTemplate } from './view/trip-events-item.js';
import { createTripEventsEditTemplate } from './view/trip-events-edit.js';
import { createTripEventsCreateTemplate } from './view/trip-events-create.js';
import { generatePoint } from './mock/generate-point.js';

const TRIP_EVENTS_COUNT = 15;

const pointsData = new Array(TRIP_EVENTS_COUNT).fill().map(generatePoint);
// console.log(pointsData);

const sortByDateAscending = (a, b) => new Date(a) - new Date(b);
const sortedPointsData = pointsData.sort((a, b) => sortByDateAscending(a.dateFrom, b.dateFrom));
// console.log(sortedPointsData);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(tripMainElement, createTripInfoTemplate(), 'afterbegin');

const tripInfoElement = tripMainElement.querySelector('.trip-info');

render(tripInfoElement, createTripInfoMainTemplate(sortedPointsData), 'beforeend');
render(tripInfoElement, createTripInfoCostTemplate(sortedPointsData), 'beforeend');

render(tripControlsNavigationElement, createNavigationTemplate(), 'beforeend');
render(tripControlsFiltersElement, createTripFiltersTemplate(sortedPointsData), 'beforeend');

render(tripEventsElement, createTripSortTemplate(), 'beforeend');

render(tripEventsElement, createTripEventsListTemplate(), 'beforeend');

if (pointsData.length === 0) {
  render(tripEventsElement, createTripEventsCreateTemplate(), 'beforeend');
}

else {
  const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');
  render(tripEventsListElement, createTripEventsEditTemplate(sortedPointsData[0]), 'afterbegin');

  for (let i = 1; i < TRIP_EVENTS_COUNT; i++) {
    render(tripEventsListElement, createTripEventsItemTemplate(sortedPointsData[i]), 'beforeend');
  }
}
