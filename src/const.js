const AUTHORIZATION = 'Basic 1577653oaheichyk1';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const STORE_PREFIX = 'big-trip-localstorage';
const STORE_VER = 'v14';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const DOCUMENT_OFFLINE_TITLE = ' [Offline]';

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

export {
  AUTHORIZATION,
  END_POINT,
  STORE_NAME,
  DOCUMENT_OFFLINE_TITLE,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  NavigationItem
};
