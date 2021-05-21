const AUTHORIZATION = 'Basic 1577653oaheichyk';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

// const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

// const OFFERS = {
//   lugagge: {
//     title: 'Add luggage',
//     price: 30,
//     name: 'lugagge',
//   },
//   comfort: {
//     title: 'Switch to comfort class',
//     price: 100,
//     name: 'comfort',
//   },
//   meal: {
//     title: 'Add meal',
//     price: 15,
//     name: 'meal',
//   },
//   seats: {
//     title: 'Choose seats',
//     price: 5,
//     name: 'seats',
//   },
//   train: {
//     title: 'Travel by train',
//     price: 40,
//     name: 'train',
//   },
//   business: {
//     title: 'Upgrade to a business class',
//     price: 120,
//     name: 'business',
//   },
//   radio: {
//     title: 'Choose the radio station',
//     price: 60,
//     name: 'radio',
//   },
// };

// const OFFERS_OF_TYPE = [
//   {
//     type: TYPES[0].toLowerCase(),
//     offers: [OFFERS.radio, OFFERS.business],
//   },
//   {
//     type: TYPES[1].toLowerCase(),
//     offers: [OFFERS.comfort, OFFERS.business, OFFERS.seats],
//   },
//   {
//     type: TYPES[2].toLowerCase(),
//     offers: [OFFERS.meal, OFFERS.business, OFFERS.seats],
//   },
//   {
//     type: TYPES[3].toLowerCase(),
//     offers: [OFFERS.comfort, OFFERS.train, OFFERS.lugagge],
//   },
//   {
//     type: TYPES[4].toLowerCase(),
//     offers: [],
//   },
//   {
//     type: TYPES[5].toLowerCase(),
//     offers: [OFFERS.radio, OFFERS.business],
//   },
//   {
//     type: TYPES[6].toLowerCase(),
//     offers: [OFFERS.comfort, OFFERS.business, OFFERS.seats],
//   },
//   {
//     type: TYPES[7].toLowerCase(),
//     offers: [OFFERS.meal, OFFERS.radio, OFFERS.seats],
//   },
//   {
//     type: TYPES[8].toLowerCase(),
//     offers: [OFFERS.comfort, OFFERS.train, OFFERS.lugagge],
//   },
//   {
//     type: TYPES[9].toLowerCase(),
//     offers: [],
//   },
// ];

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const NavigationItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

const HIDE_CLASS = 'visually-hidden';

export {
  AUTHORIZATION,
  END_POINT,
  //TYPES,
  //OFFERS,
  //OFFERS_OF_TYPE,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  NavigationItem,
  HIDE_CLASS
};
