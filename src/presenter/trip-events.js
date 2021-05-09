import SortView from '../view/sort.js';
import EventsListView from '../view/events-list.js';
import NoEventView from '../view/no-event.js';
import PointPresenter from './point.js';
import { remove, render, RenderPosition } from '../utils/render.js';
import { sortByDurationDescending, sortByDateAscending, sortByPriceDescending } from '../utils/data-processing.js';
import { SortType, UpdateType, UserAction } from '../const.js';

export default class TripEvents {
  constructor(tripEventsContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripEventsContainer = tripEventsContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;
    this._eventListComponent = new EventsListView();
    this._noEventComponent = new NoEventView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._tripEventsContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderTripEvents();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.DAY:
        return this._pointsModel.getPoints().slice().sort(sortByDateAscending);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortByDurationDescending);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortByPriceDescending);
    }
    return this._pointsModel.getPoints();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripEventsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(point) {
    const pointPresenter = new PointPresenter(this._eventListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderEvents(points) {
    points.forEach((point) => this._renderEvent(point));
  }

  _clearListOfEvents() {
    Object
      .values(this._pointPresenter)
      .forEach((pointPresenter) => pointPresenter.destroy());
    this._pointPresenter = {};
  }

  _clearTripEvents() {
    // Object
    //   .values(this._pointPresenter)
    //   .forEach((pointPresenter) => pointPresenter.destroy());
    // this._pointPresenter = {};

    this._clearListOfEvents();
    remove(this._sortComponent);
  }

  _renderListOfEvents() {
    const points = this._getPoints();
    this._renderEvents(points);
  }

  _renderNoEvent() {
    render(this._tripEventsContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderTripEvents() {
    if (!this._getPoints().length) {
      this._renderNoEvent();
      return;
    }
    this._renderSort();
    this._renderListOfEvents();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, point) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenter[point.id].init(point);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearListOfEvents();
        this._renderListOfEvents();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearTripEvents();
        this._renderTripEvents();
        break;
    }
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

    this._currentSortType = sortType;
    this._clearTripEvents();
    this._renderTripEvents();
  }
}
