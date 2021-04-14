import TripInfoView from './view/trip-info.js';
import TripInfoMainView from './view/trip-info-main.js';
import TripInfoCostView from './view/trip-info-cost.js';
import NavigationView from './view/navigation.js';
import FiltersView from './view/filters.js';
import SortView from './view/sort.js';
import EventsListView from './view/events-list.js';
import EventItemView from './view/event-item.js';
import EventEditView from './view/event-edit.js';
import NewEventView from './view/new-event.js';
import { generatePoint } from './mock/generate-point.js';
import { sortByDateAscending, render, RenderPosition } from './util.js';

const TRIP_EVENTS_COUNT = 15;

const pointsData = new Array(TRIP_EVENTS_COUNT).fill().map(generatePoint);
const sortedPointsData = pointsData.sort((a, b) => sortByDateAscending(a.dateFrom, b.dateFrom));

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripInfoComponent = new TripInfoView();
const eventsListComponent = new EventsListView();

const renderEvent = (eventListElement, eventItem) => {
  const eventItemComponent = new EventItemView(eventItem);
  const eventEditComponent = new EventEditView(eventItem);

  const openEventEdit = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventItemComponent.getElement());
  };

  const closeEventEdit = () => {
    eventListElement.replaceChild(eventItemComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closeEventEdit();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventItemComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    openEventEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    closeEventEdit();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().firstElementChild.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closeEventEdit();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, eventItemComponent.getElement(), RenderPosition.BEFOREEND);
};

render(tripMainElement, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

render(tripControlsNavigationElement, new NavigationView().getElement(), RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new FiltersView(sortedPointsData).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, eventsListComponent.getElement(), RenderPosition.BEFOREEND);

if (pointsData.length === 0 || !pointsData) {
  render(tripEventsElement, new NewEventView().getElement(), RenderPosition.BEFOREEND);
}

else {
  render(tripInfoComponent.getElement(), new TripInfoMainView(sortedPointsData).getElement(), RenderPosition.BEFOREEND);
  render(tripInfoComponent.getElement(), new TripInfoCostView(sortedPointsData).getElement(), RenderPosition.BEFOREEND);

  sortedPointsData.forEach((point) => renderEvent(eventsListComponent.getElement(), point));
}
