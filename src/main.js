import TripEventsPresenter from './presenter/trip-events.js';
import TripMainPresenter from './presenter/trip-main.js';
import PointsModel from './model/points.js';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import StatisticsView from './view/statistics.js';
import NavigationView from './view/navigation.js';
import { NavigationItem, UpdateType, AUTHORIZATION, END_POINT } from './const.js';
import Api from './api.js';
import { render, RenderPosition } from './utils/render.js';

//import { generatePoints } from './mock/generate-point.js';
//const TRIP_EVENTS_COUNT = 5;
//const pointsData = generatePoints(TRIP_EVENTS_COUNT);
//console.log(pointsData);

const api = new Api(END_POINT, AUTHORIZATION);
document.querySelector('.trip-main__event-add-btn').disabled = true;

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

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

api.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);

    document.querySelector('.trip-main__event-add-btn').disabled = false;

    navigationComponent.setNavigationClickHandler(handleNavigationClick);
    render(navigationContainer, navigationComponent, RenderPosition.BEFOREEND);
  })
  .catch(() => {
    // ???
    pointsModel.setPoints(UpdateType.INIT, []);
  });


// Нужно заменить const cityInfoArray в generate-points.js ???
api.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(destinations);
  })
  .catch(() => {
    // ???
    destinationsModel.setDestinations([]);
  });


// Нужно заменить const OFFERS_OF_TYPE в const.js ???
api.getOffers()
  .then((offers) => {
    offersModel.setOffers(offers);
  })
  .catch(() => {
    // ???
    offersModel.setOffers([]);
  });

const tripMainPresenter = new TripMainPresenter(pointsModel);
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
