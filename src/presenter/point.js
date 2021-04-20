import EventItemView from '../view/event-item.js';
import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Point {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;

    this._eventItemComponent = null;
    this._eventEditComponent = null;

    this._handleArrowClick = this._handleArrowClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    this._eventItemComponent = new EventItemView(point);
    this._eventEditComponent = new EventEditView(point);

    this._eventItemComponent.setArrowClickHandler(this._handleArrowClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._eventListContainer, this._eventItemComponent, RenderPosition.BEFOREEND);
  }

  _openEventEdit() {
    replace(this._eventEditComponent, this._eventItemComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeEventEdit() {
    replace(this._eventItemComponent, this._eventEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closeEventEdit();
    }
  }

  _handleArrowClick() {
    this._openEventEdit();
  }

  _handleFormSubmit() {
    this._closeEventEdit();
  }
}
