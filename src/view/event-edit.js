import dayjs from 'dayjs';
import { TYPES, OFFERS } from '../const.js';
import { createDOMElementFromMarkup } from '../util.js';

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

const createEventEditTemplate = (point) => {
  const {
    dateFrom,
    dateTo,
    basePrice,
    type,
    info,
    offers,
  } = point;

  const typesCheckboxTemplate = TYPES.map((item, index) => {
    return `
    <div class="event__type-item">
      <input
        id="event-type-${item.toLowerCase()}-${index}"
        class="event__type-input  visually-hidden"
        type="radio" name="event-type"
        value="${item.toLowerCase()}"
      />
      <label
      class="event__type-label  event__type-label--${item.toLowerCase()}"
      for="event-type-${item.toLowerCase()}-${index}">
        ${item}
      </label>
    </div>
    `;
  }).join('\n');

  const offersCheckboxTemplate = OFFERS.map((item, index) => {
    const isCheckedOffer = offers.map((offer) => offer.shortName).includes(item.shortName);

    if (isCheckedOffer) {
      return `
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${item.shortName}-${index}"
          type="checkbox"
          name="event-offer-${item.shortName}" checked
        />
        <label
          class="event__offer-label"
          for="event-offer-${item.shortName}-${index}">
            <span class="event__offer-title">${item.name}</span>
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
        id="event-offer-${item.shortName}-${index}"
        type="checkbox"
        name="event-offer-${item.shortName}"
        />
      <label
        class="event__offer-label"
        for="event-offer-${item.shortName}-1">
          <span class="event__offer-title">${item.name}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${item.price}</span>
      </label>
    </div>
    `;
  }).join('\n');

  const createDestinationTemplate = () => {

    const createImagesTemplate = () => {
      if (info.pictures) {
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

    if (info.description) {
      return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">${info.name}</h3>
        <p class="event__destination-description">
          ${info.description}
        </p>
        ${createImagesTemplate()}
      </section>
      `;
    }
    return '';
  };

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>

          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"/>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${typesCheckboxTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input
            class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${info.name}"
            list="destination-list-1"
          />
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}"
          />
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}"
          />
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-1"
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
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersCheckboxTemplate}
          </div>
        </section>
        ${createDestinationTemplate()}
      </section>
    </form>
  </li>
  `;
};

export default class EventEdit {
  constructor(point = BLANK_EVENT) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElementFromMarkup(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}