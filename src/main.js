import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

import PointsModel from './model/points.js';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers.js';
import FilterModel from './model/filter.js';

import StatisticsView from './view/statistics.js';
import NavigationView from './view/navigation.js';

import FilterPresenter from './presenter/filter.js';
import TripEventsPresenter from './presenter/trip-events.js';
import TripMainPresenter from './presenter/trip-main.js';

import { NavigationItem, UpdateType, AUTHORIZATION, END_POINT, STORE_NAME } from './const.js';
import { remove, render, RenderPosition } from './utils/render.js';
import { showAlert, isOnline } from './utils/common.js';


const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

document.querySelector('.trip-main__event-add-btn').disabled = true;

const filtersContainer = document.querySelector('.trip-controls__filters');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();


apiWithProvider.getData()
  .then(([points, destinations, offers]) => {
    destinationsModel.setDestinations(destinations);
    offersModel.setOffers(offers);
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .then(() => {
    document.querySelector('.trip-main__event-add-btn').disabled = false;

    const navigationComponent = new NavigationView();
    render(navigationContainer, navigationComponent, RenderPosition.BEFOREEND);

    const tripMainPresenter = new TripMainPresenter(pointsModel);
    tripMainPresenter.init();

    const filterPresenter = new FilterPresenter(filtersContainer, filterModel, pointsModel);
    filterPresenter.init();

    const tripEventsPresenter = new TripEventsPresenter(tripEventsContainer, pointsModel, filterModel, destinationsModel, offersModel, apiWithProvider);
    tripEventsPresenter.init();

    let statisticsComponent = null;

    const handleNavigationClick = (navigationItem) => {
      switch(navigationItem) {
        case NavigationItem.TABLE:
          remove(statisticsComponent);
          document.querySelector('.trip-main__event-add-btn').disabled = false;
          tripEventsPresenter.init();
          break;

        case NavigationItem.STATS:
          tripEventsPresenter.destroy();
          document.querySelector('.trip-main__event-add-btn').disabled = true;
          statisticsComponent = new StatisticsView(pointsModel);
          render(tripEventsContainer, statisticsComponent, RenderPosition.AFTERBEGIN);
          break;
      }
    };

    navigationComponent.setNavigationClickHandler(handleNavigationClick);

    document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
      evt.preventDefault();

      if (!isOnline()) {
        showAlert('You can\'t create event offline');
        return;
      }

      document.querySelector('.trip-main__event-add-btn').disabled = true;
      tripEventsPresenter.createEvent();
    });
  })
  .catch(() => showAlert());

window.addEventListener('load', () => {
  navigator.serviceWorker.register('./sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
