import SortView from '../view/sort.js';
import EventsListView from '../view/events-list.js';
import NoEventView from '../view/no-event.js';
import PointPresenter from '../presenter/point.js';
import {render, RenderPosition} from '../utils/render.js';

export default class TripEvents {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;

    this._sortComponent = new SortView();
    this._eventListComponent = new EventsListView();
    this._noEventComponent = new NoEventView();
  }

  init(pointsData) {
    this._pointsData = pointsData;

    render(this._tripEventsContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(point) {
    const pointPresenter = new PointPresenter(this._eventListComponent);
    pointPresenter.init(point);
  }

  _renderEvents() {
    this._pointsData.forEach((point) => this._renderEvent(point));
  }

  _renderListOfEvents() {
    this._renderEvents();
  }

  _renderNoEvent() {
    render(this._tripEventsContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderTripEvents() {
    if (!this._pointsData.length) {
      this._renderNoEvent();
    }

    this._renderSort();
    this._renderListOfEvents();
  }
}
