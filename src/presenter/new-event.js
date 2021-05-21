import EventEditView from '../view/event-edit.js';
import dayjs from 'dayjs';
//import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

const BLANK_EVENT = {
  dateFrom: dayjs(),
  dateTo: dayjs(dayjs()).add(1, 'day'),
  basePrice: 0,
  type: 'sightseeing',
  info: null,
  // {
  //   name: '',
  //   description: '',
  //   pictures: [],
  // },
  isFavorite: false,
  offers: [],
};


export default class NewEvent {
  constructor(eventListComponent, changeData, destinationsModel, offersModel) {
    this._eventListComponent = eventListComponent;
    this._changeData = changeData;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;

    this._eventEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormDeleteClick = this._handleFormDeleteClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventEditView(BLANK_EVENT, this._destinationsModel.getDestinations(), this._offersModel.getOffers());
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormDeleteClickHandler(this._handleFormDeleteClick);

    render(this._eventListComponent, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._handleEscKeyDown);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    document.querySelector('.trip-main__event-add-btn').disabled = false;
    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener('keydown', this._handleEscKeyDown);
  }

  setSaving() {
    this._eventEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._eventEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
    //this.destroy();
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
