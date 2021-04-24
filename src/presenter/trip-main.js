import TripInfoView from '../view/trip-info.js';
import TripInfoMainView from '../view/trip-info-main.js';
import TripInfoCostView from '../view/trip-info-cost.js';
import NavigationView from '../view/navigation.js';
import FiltersView from '../view/filters.js';
import { render, RenderPosition } from '../utils/render.js';


export default class TripMain {
  constructor(tripMainContainer, navigationContainer, filtersContainer) {
    this._tripMainContainer = tripMainContainer;
    this._navigationContainer = navigationContainer;
    this._filtersContainer = filtersContainer;

    this._tripInfoComponent = new TripInfoView();
    this._tripInfoMainComponent = null;
    this._tripInfoCostComponent = null;
    this._navigationComponent = new NavigationView();
    this._filtersComponent = null;
  }

  init(pointsData) {
    this._pointsData = pointsData;

    this._tripInfoMainComponent = new TripInfoMainView(this._pointsData);
    this._tripInfoCostComponent = new TripInfoCostView(this._pointsData);
    this._filtersComponent = new FiltersView(this._pointsData);

    render(this._tripMainContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    this._renderTripMain();
  }

  _renderTripInfo() {
    render(this._tripInfoComponent, this._tripInfoMainComponent, RenderPosition.BEFOREEND);
    render(this._tripInfoComponent, this._tripInfoCostComponent, RenderPosition.BEFOREEND);
  }

  _renderNavigation() {
    render(this._navigationContainer, this._navigationComponent, RenderPosition.BEFOREEND);
  }

  _renderFilters() {
    render(this._filtersContainer, this._filtersComponent, RenderPosition.BEFOREEND);
  }

  _renderTripMain() {
    this._renderNavigation();

    if (this._pointsData.length) {
      this._renderTripInfo();
      this._renderFilters();
    }
  }
}


