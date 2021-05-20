import {
  getRandomInteger,
  getRandomElementFromArray,
  makeRandomArray
} from './utils.js';

import { TYPES, OFFERS_OF_TYPE } from '../const.js';

import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

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
    //description: makeRandomArray(DESCRIPTIONS).slice(0, 0).join(''),
    pictures: new Array(getRandomInteger(0, 5)).fill(null).map(generatePhoto),
  };
};

export const cityInfoArray = CITYES.map((city) => generateCityInfo(city));

const generatePoint = () => {
  const dayGap = getRandomInteger(-MAX_DATE_GAP, MAX_DATE_GAP);

  const dateFrom = dayjs().add(dayGap, 'day').toDate();
  const dateTo = dayjs(dateFrom).add((getRandomInteger(3, 30) * 10), 'minute').toDate();
  const type = getRandomElementFromArray(TYPES).toLowerCase();

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
