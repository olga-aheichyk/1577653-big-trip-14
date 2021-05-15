import Observer from '../utils/observer.js';
import { FilterType } from '../const.js';

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  // установить фильтр
  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  // узнать текущий фильтр
  getFilter() {
    return this._activeFilter;
  }
}
