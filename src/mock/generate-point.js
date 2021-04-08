import {
  getRandomInteger,
  getRandomElementFromArray,
  makeRandomArray
} from '../util.js';

import dayjs from 'dayjs';

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

const OFFERS = [
  {
    name: 'Add luggage',
    price: 30,
    shortName: 'lugagge',
  },
  {
    name: 'Switch to comfort class',
    price: 100,
    shortName: 'comfort',
  },
  {
    name: 'Add meal',
    price: 15,
    shortName: 'meal',
  },
  {
    name: 'Choose seats',
    price: 5,
    shortName: 'seats',
  },
  {
    name: 'Travel by train',
    price: 40,
    shortName: 'train',
  },
];

const PHOTOS = [];
const PHOTOS_COUNT = 10;
const MAX_DATE_GAP = 30;

const generatePhotosSrcArray = () => {
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    PHOTOS.push(`http://picsum.photos/248/152?r=${i}`);
  }
  return PHOTOS;
};

const generatePhoto = () => {
  return {
    src: getRandomElementFromArray(generatePhotosSrcArray()),
    description: getRandomElementFromArray(DESCRIPTIONS),
  };
};

const generateInfo = () => {
  return {
    name: getRandomElementFromArray(CITYES),
    description: makeRandomArray(DESCRIPTIONS).slice(0, 5).join(' '),
    pictures: new Array(getRandomInteger(1, 5)).fill().map(generatePhoto),
  };
};


export const generatePoint = () => {
  const dayGap = getRandomInteger(-MAX_DATE_GAP, MAX_DATE_GAP);

  const dateFrom = dayjs().add(dayGap, 'day').toDate();
  const dateTo = dayjs(dateFrom).add(getRandomInteger(30, 300), 'minute').toDate();

  return {
    type: getRandomElementFromArray(POINT_TYPES),
    offers: makeRandomArray(OFFERS),
    info: generateInfo(),
    id: getRandomInteger(1, 20),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    basePrice: getRandomInteger(10, 500),
    dateFrom,
    dateTo,
  };
};
