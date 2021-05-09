import TripEventsPresenter from './presenter/trip-events.js';
import TripMainPresenter from './presenter/trip-main.js';
import PointsModel from './model/points.js';

import { generatePoints } from './mock/generate-point.js';

const TRIP_EVENTS_COUNT = 15;

const pointsData = generatePoints(TRIP_EVENTS_COUNT);
// console.log(pointsData);

const pointsModel = new PointsModel();
pointsModel.setPoints(pointsData);

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

const tripMainPresenter = new TripMainPresenter(tripMainElement, tripControlsNavigationElement, tripControlsFiltersElement, pointsModel);
tripMainPresenter.init();

const tripEventsElement = document.querySelector('.trip-events');

const tripEventsPresenter = new TripEventsPresenter(tripEventsElement, pointsModel);
tripEventsPresenter.init();
