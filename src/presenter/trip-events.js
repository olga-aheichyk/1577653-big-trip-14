import SortView from '../view/sort.js';
import EventsListView from '../view/events-list.js';
import NoEventView from '../view/no-event.js';
import PointPresenter from '../presenter/point.js';
import { render, RenderPosition } from '../utils/render.js';
import { updateItem } from '../utils/data-processing.js';

export default class TripEvents {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._pointPresenter = {};

    this._sortComponent = new SortView();
    this._eventListComponent = new EventsListView();
    this._noEventComponent = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(pointsData) {
    this._pointsData = pointsData;

    render(this._tripEventsContainer, this._eventListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _handleEventChange(updatedPoint) {
    this._pointsData = updateItem(this._pointsData, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((pointPresenter) => pointPresenter.resetView());
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(point) {
    const pointPresenter = new PointPresenter(this._eventListComponent, this._handleEventChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderEvents() {
    this._pointsData.forEach((point) => this._renderEvent(point));
  }

  _clearListOfEvents() {
    Object
      .values(this._pointPresenter)
      .forEach((pointPresenter) => pointPresenter.destroy());
    this._pointPresenter = {};
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
