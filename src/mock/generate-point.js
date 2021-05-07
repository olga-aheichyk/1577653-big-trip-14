import {
  getRandomInteger,
  getRandomElementFromArray,
  makeRandomArray
} from './utils.js';

import dayjs from 'dayjs';

import { nanoid } from 'nanoid';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CITYES = [
  'Paris', 'Rome', 'Barcelona', 'Berlin', 'Venecia', 'Lissabon', 'Geneva', 'Amsterdam', 'Praha', 'Tallin',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. ',
  'Aliquam id orci ut lectus varius viverra. ',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. ',
  'In rutrum ac purus sit amet tempus. ',
];

const OFFERS = {
  lugagge: {
    title: 'Add luggage', // name
    price: 30,
    name: 'lugagge',
  },
  comfort: {
    title: 'Switch to comfort class',
    price: 100,
    name: 'comfort',
  },
  meal: {
    title: 'Add meal',
    price: 15,
    name: 'meal',
  },
  seats: {
    title: 'Choose seats',
    price: 5,
    name: 'seats',
  },
  train: {
    title: 'Travel by train',
    price: 40,
    name: 'train',
  },
  business: {
    title: 'Upgrade to a business class',
    price: 120,
    name: 'business',
  },
  radio: {
    title: 'Choose the radio station',
    price: 60,
    name: 'radio',
  },
};

const OFFERS_OF_TYPE = {
  taxi: [OFFERS.business, OFFERS.radio],
  bus: [OFFERS.radio, OFFERS.seats, OFFERS.train],
  train: [OFFERS.seats, OFFERS.meal, OFFERS.comfort],
  ship: [OFFERS.seats, OFFERS.lugagge, OFFERS.comfort],
  transport: [OFFERS.seats, OFFERS.lugagge, OFFERS.comfort, OFFERS.train],
  drive: [OFFERS.comfort],
  flight: [OFFERS.seats, OFFERS.lugagge, OFFERS.comfort],
  'check-in': [],
  sightseeing: [OFFERS.train, OFFERS.seats],
  restaurant: [OFFERS.radio],
};

const PHOTOS_COUNT = 10;
const MAX_DATE_GAP = 30;

const generatePhotosSrcArray = () => {
  const photos = [];
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push(`http://picsum.photos/248/152?r=${i}`);
  }
  return photos;
};

const generatePhoto = () => {
  return {
    src: getRandomElementFromArray(generatePhotosSrcArray()),
    description: getRandomElementFromArray(DESCRIPTIONS),
  };
};

const generateCityInfo = (city) => {
  return {
    name: city,
    description: makeRandomArray(DESCRIPTIONS).slice(0, (getRandomInteger(0, 5))).join(' '),
    pictures: new Array(getRandomInteger(0, 5)).fill(null).map(generatePhoto),
  };
};

export const cityInfoArray = CITYES.map((city) => generateCityInfo(city));

const generatePoint = () => {
  const dayGap = getRandomInteger(-MAX_DATE_GAP, MAX_DATE_GAP);

  const dateFrom = dayjs().add(dayGap, 'day').toDate();
  const dateTo = dayjs(dateFrom).add((getRandomInteger(3, 30) * 10), 'minute').toDate();
  const type = getRandomElementFromArray(POINT_TYPES);

  return {
    type,
    offers: makeRandomArray(OFFERS_OF_TYPE[type]),
    info: getRandomElementFromArray(cityInfoArray),
    id: nanoid(5),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomInteger(10, 500),
    dateFrom,
    dateTo,
  };
};

export const generatePoints = (count) => {
  return new Array(count).fill(null).map(() => generatePoint());
};
