import EventEditView from '../view/event-edit.js';
import EventsListView from '../view/events-list.js';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

export default class NewPoint {
  constructor(eventListComponent, changeData) {
    //this._tripEventsContainer = document.querySelector('.trip-events');
    this._eventListComponent = eventListComponent;
    this._changeData = changeData;

    this._eventEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormDeleteClick = this._handleFormDeleteClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventEditView();
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormDeleteClickHandler(this._handleFormDeleteClick);

    //render(this._tripEventsContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    render(this._eventListComponent, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._handleEscKeyDown);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      Object.assign({id: nanoid(5)}, point),
    );
    this.destroy();
  }

  _handleFormDeleteClick() {
    this.destroy();
  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}