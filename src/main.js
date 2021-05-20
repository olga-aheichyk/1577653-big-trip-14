import TripEventsPresenter from './presenter/trip-events.js';
import TripMainPresenter from './presenter/trip-main.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import StatisticsView from './view/statistics.js';
import NavigationView from './view/navigation.js';
import { NavigationItem } from './const.js';

import { generatePoints } from './mock/generate-point.js';
import { render, RenderPosition } from './utils/render.js';

const TRIP_EVENTS_COUNT = 5;

const pointsData = generatePoints(TRIP_EVENTS_COUNT);
// console.log(pointsData);

const pointsModel = new PointsModel();
pointsModel.setPoints(pointsData);

const filterModel = new FilterModel();

const tripMainPresenter = new TripMainPresenter(pointsModel, filterModel);
tripMainPresenter.init();

const filtersContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);
filterPresenter.init();

const tripEventsContainer = document.querySelector('.trip-events');
const tripEventsPresenter = new TripEventsPresenter(tripEventsContainer, pointsModel, filterModel);
tripEventsPresenter.init();

const statisticsComponent = new StatisticsView();
render(tripEventsContainer, statisticsComponent, RenderPosition.AFTERBEGIN);
statisticsComponent.hide();


document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  document.querySelector('.trip-main__event-add-btn').disabled = true;
  tripEventsPresenter.createEvent();
});

const navigationContainer = document.querySelector('.trip-controls__navigation');
const navigationComponent = new NavigationView();

const handleNavigationClick = (navigationItem) => {
  switch(navigationItem) {
    case NavigationItem.TABLE:
      statisticsComponent.hide();
      tripEventsPresenter.destroy();
      tripEventsPresenter.init();
      break;

    case NavigationItem.STATS:
      tripEventsPresenter.destroy();
      statisticsComponent.show();
      break;
  }
};

navigationComponent.setNavigationClickHandler(handleNavigationClick);
render(navigationContainer, navigationComponent, RenderPosition.BEFOREEND);
