import TripInfoView from '../view/trip-info.js';
import TripInfoMainView from '../view/trip-info-main.js';
import TripInfoCostView from '../view/trip-info-cost.js';
import NavigationView from '../view/navigation.js';
import { remove, render, RenderPosition } from '../utils/render.js';
//import { UpdateType } from '../const.js';
export default class TripMain {
  constructor(pointsModel) {
    this._tripMainContainer = document.querySelector('.trip-main');
    this._navigationContainer = document.querySelector('.trip-controls__navigation');

    this._pointsModel = pointsModel;

    this._tripInfoComponent = new TripInfoView();
    this._tripInfoMainComponent = null;
    this._tripInfoCostComponent = null;
    this._navigationComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._tripMainContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    this._renderTripMain();
  }

  _getPoints() {
    return this._pointsModel.getPoints();
  }

  _renderTripInfo() {
    const points = this._getPoints();

    this._tripInfoMainComponent = new TripInfoMainView(points);
    render(this._tripInfoComponent, this._tripInfoMainComponent, RenderPosition.BEFOREEND);

    this._tripInfoCostComponent = new TripInfoCostView(points);
    render(this._tripInfoComponent, this._tripInfoCostComponent, RenderPosition.BEFOREEND);
  }

  _renderNavigation() {
    this._navigationComponent = new NavigationView();
    render(this._navigationContainer, this._navigationComponent, RenderPosition.BEFOREEND);
  }

  _renderTripMain() {
    this._renderNavigation();

    if (this._getPoints().length) {
      this._renderTripInfo();
    }
  }

  _clearTripMain() {
    remove(this._tripInfoMainComponent);
    remove(this._tripInfoCostComponent);
    remove(this._navigationComponent);
  }

  _handleModelEvent() {
    this._clearTripMain();
    this._renderTripMain();
  }
}


