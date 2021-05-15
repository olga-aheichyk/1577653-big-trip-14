import TripEventsPresenter from './presenter/trip-events.js';
import TripMainPresenter from './presenter/trip-main.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

import { generatePoints } from './mock/generate-point.js';

const TRIP_EVENTS_COUNT = 3;

const pointsData = generatePoints(TRIP_EVENTS_COUNT);
// console.log(pointsData);

const pointsModel = new PointsModel();
pointsModel.setPoints(pointsData);

const filterModel = new FilterModel();

const tripMainPresenter = new TripMainPresenter(pointsModel);
tripMainPresenter.init();

const filtersContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);
filterPresenter.init()

const tripEventsPresenter = new TripEventsPresenter(pointsModel, filterModel);
tripEventsPresenter.init();
