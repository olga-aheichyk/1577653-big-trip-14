import SortView from '../view/sort.js';
import EventsListView from '../view/events-list.js';
import NoEventView from '../view/no-event.js';
import PointPresenter from './point.js';
import { render, RenderPosition } from '../utils/render.js';
import { updateItem, sortByDurationDescending, sortByDateAscending, sortByPriceDescending } from '../utils/data-processing.js';
import { SortType } from '../const.js';

export default class TripEvents {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = new SortView();
    this._eventListComponent = new EventsListView();
    this._noEventComponent = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(pointsData) {
    this._pointsData = pointsData;
    this._sortPoints();
    // this._sourcedPointsData = pointsData.slice();

    render(this._tripEventsContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderTripEvents();
  }

  _sortPoints(sortType = SortType.DAY) {
    this._currentSortType = sortType;

    switch (sortType) {
      case SortType.DAY:
        this._pointsData.sort(sortByDateAscending);
        break;
      case SortType.TIME:
        this._pointsData.sort(sortByDurationDescending);
        break;
      case SortType.PRICE:
        this._pointsData.sort(sortByPriceDescending);
        break;
    }
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    else {
      this._renderSort();
      this._renderListOfEvents();
    }
  }

  _handleEventChange(updatedPoint) {
    // console.log('До изменения');
    // console.log(this._pointsData.find((prevEventItem) => prevEventItem.id === updatedPoint.id));
    this._pointsData = updateItem(this._pointsData, updatedPoint);
    // console.log('После изменения');
    // console.log(updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((pointPresenter) => pointPresenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearListOfEvents();
    this._renderListOfEvents();

  }
}
