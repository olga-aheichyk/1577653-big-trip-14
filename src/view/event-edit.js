import dayjs from 'dayjs';
import { TYPES, OFFERS_OF_TYPE } from '../const.js';
import { cityInfoArray } from '../mock/generate-point.js';
import SmartClassView from './smart-class.js';

import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  dateFrom: dayjs(),
  dateTo: dayjs(dayjs()).add(1, 'day'),
  basePrice: 0,
  type: 'flight',
  info: {
    name: '',
    description: '',
    pictures: {
      src: '',
      description: '',
    },
  },
  offers: [],
};

const createEventEditTemplate = (state) => {
  const {
    dateFrom,
    dateTo,
    basePrice,
    type,
    info,
    offers,
    id,
    hasOffers,
    hasDescription,
    hasImages,
  } = state;

  const createTypesCheckboxTemplate = (id) => {
    const typesCheckboxTemplate = TYPES.map((item) => {
      return `
      <div class="event__type-item">
        <input
          id="event-type-${item.toLowerCase()}-${id}"
          class="event__type-input  visually-hidden"
          type="radio" name="event-type"
          value="${item.toLowerCase()}"
        />
        <label
        class="event__type-label  event__type-label--${item.toLowerCase()}"
        for="event-type-${item.toLowerCase()}-${id}">
          ${item}
        </label>
      </div>
      `;
    }).join('\n');

    return typesCheckboxTemplate;
  };

  const createOffersCheckboxTemplate = (type, id) => {

    const offersCheckboxTemplate = OFFERS_OF_TYPE[type].map((item) => {
      const isCheckedOffer = offers.map((offer) => offer.name).includes(item.name);

      if (isCheckedOffer) {
        return `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox  visually-hidden"
            id="event-offer-${item.name}-${id}"
            type="checkbox"
            name="event-offer-${item.name}" checked
          />
          <label
            class="event__offer-label"
            for="event-offer-${item.name}-${id}">
              <span class="event__offer-title">${item.title}</span>
                &plus;&euro;&nbsp;
              <span class="event__offer-price">${item.price}</span>
          </label>
        </div>
        `;
      }

      return `
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${item.name}-${id}"
          type="checkbox"
          name="event-offer-${item.name}"
          />
        <label
          class="event__offer-label"
          for="event-offer-${item.name}-${id}">
            <span class="event__offer-title">${item.title}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
        </label>
      </div>
      `;
    }).join('\n');

    if (hasOffers) {
      return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersCheckboxTemplate}
      </div>`;
    }
    return '';
  };

  const createDestinationTemplate = () => {

    const createImagesTemplate = () => {
      if (hasImages) {
        const imagesMarkup = info.pictures.map((item) => {
          return `
          <img
            class="event__photo"
            src = "${item.src}"
            alt = "${item.description}"
          />
        `;
        }).join('\n');

        return `
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${imagesMarkup}
          </div>
        </div>`;
      }

      return '';
    };

    const createDescriptionTemplate = () => {
      if (hasDescription) {
        return `
          <p class="event__destination-description">
            ${info.description}
          </p>`;
      }

      return '';
    };

    if (hasDescription || hasImages) {
      return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${createDescriptionTemplate()}
        ${createImagesTemplate()}
      </section>
      `;
    }
    return '';
  };

  const createEventDetailsTemplate = () => {
    if (hasOffers || hasDescription || hasImages) {
      return `
        <section class="event__details">
          ${createOffersCheckboxTemplate(type, id)}
          ${createDestinationTemplate()}
        </section>`
    }
    return '';
  }

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>

          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox"/>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypesCheckboxTemplate(id)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
          </label>
          <input
            class="event__input  event__input--destination"
            id="event-destination-${id}"
            type="text"
            name="event-destination"
            value="${info.name}"
            list="destination-list-${id}"
          />
          <datalist id="destination-list-${id}">
            <option value="Paris"></option>
            <option value="Rome"></option>
            <option value="Barcelona"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input
            class="event__input  event__input--time"
            id="event-start-time-${id}"
            type="text"
            name="event-start-time"
            value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}"
          />
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input
            class="event__input  event__input--time"
            id="event-end-time-${id}"
            type="text"
            name="event-end-time"
            value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}"
          />
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-${id}"
            type="text"
            name="event-price"
            value="${basePrice}"
          />
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      ${createEventDetailsTemplate()}
    </form>
  </li>
  `;
};

export default class EventEdit extends SmartClassView {
  constructor(point = BLANK_EVENT) {
    super();
    // this._point = point;
    this._state = EventEdit.parsePointToState(point);
    this._datepickerFrom = null;
    this._datepickerTo = null;

    this._handleEditArrowClick = this._handleEditArrowClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormDeleteClick = this._handleFormDeleteClick.bind(this);

    this._handleTypeChange = this._handleTypeChange.bind(this);
    this._handleDestinationChange = this._handleDestinationChange.bind(this);
    this._handleDateFromChange = this._handleDateFromChange.bind(this);
    this._handleDateToChange = this._handleDateToChange.bind(this);

    this._setInnerHandlers();
    this._setDatepickerFrom();
    this._setDatepickerTo();
  }

  getTemplate() {
    return createEventEditTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }

    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }
  }

  reset(point) {
    this.updateData(
      EventEdit.parsePointToState(point)
    );
  }

  _setDatepickerFrom() {
    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }

    if (this._state.dateFrom) {
      this._datepickerFrom = flatpickr(
        this.getElement().querySelectorAll('.event__input--time')[0],
        {
          dateFormat: 'd/m/Y H:i',
          // minDate: 'today',
          enableTime: true,
          allowInput: true,
          defaultDate: this._state.dateFrom,
          onClose: this._handleDateFromChange,
        },
      );
    }
  }

  _setDatepickerTo() {
    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }

    if (this._state.dateTo) {
      this._datepickerTo = flatpickr(
        this.getElement().querySelectorAll('.event__input--time')[1],
        {
          dateFormat: 'd/m/Y H:i',
          minDate: this._state.dateFrom,
          enableTime: true,
          allowInput: true,
          defaultDate: this._state.dateTo,
          onClose: this._handleDateToChange,
        },
      );
    }
  }

  _handleEditArrowClick() {
    this._callback.editArrowClick();
  }

  setEditArrowClickHandler(callback) {
    this._callback.editArrowClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._handleEditArrowClick);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    this._callback.submitClick(EventEdit.parseStateToPoint(this._state));
  }

  setFormSubmitHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._handleFormSubmit);
  }

  _handleTypeChange(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      hasOffers: OFFERS_OF_TYPE[evt.target.value].length !== 0,
    });
  }

  _handleDestinationChange(evt) {
    evt.preventDefault();
    const cityIndex = cityInfoArray.findIndex((item) => item.name === evt.target.value);
    this.updateData({
      info: {
        name: evt.target.value,
        description: cityInfoArray[cityIndex].description,
        pictures: cityInfoArray[cityIndex].pictures,
      },
      hasDescription: cityInfoArray[cityIndex].description.length !== 0,
      hasImages: cityInfoArray[cityIndex].pictures.length !== 0,
    });
  }

  _handleDateFromChange([userDate]) {
    this.updateData({
      dateFrom: userDate,
    });
  }

  _handleDateToChange([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  _handleFormDeleteClick(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseStateToPoint(this._state));
  }

  setFormDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('form').addEventListener('reset', this._handleFormDeleteClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._handleTypeChange);

    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._handleDestinationChange);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickerFrom();
    this._setDatepickerTo();
    this.setFormSubmitHandler(this._callback.submitClick);
    this.setFormDeleteClickHandler(this._callback.deleteClick);
    this.setEditArrowClickHandler(this._callback.editArrowClick);
  }

  static parsePointToState(point) {
    return Object.assign(
      {},
      point,
      {
        hasOffers: OFFERS_OF_TYPE[point.type].length !== 0,
        hasDescription: point.info.description.length !== 0,
        hasImages: point.info.pictures.length !==  0,
      },
    );
  }

  static parseStateToPoint(state) {
    state = Object.assign({}, state);

    if (!state.hasOffers) {
      OFFERS_OF_TYPE[state.type] = [];
    }

    if (!state.hasDescription) {
      state.info.description = '';
    }

    if (!state.hasImages) {
      state.info.pictures = '';
    }

    delete state.hasOffers;
    delete state.hasDescription;
    delete state.hasImages;

    return state;
  }
}
