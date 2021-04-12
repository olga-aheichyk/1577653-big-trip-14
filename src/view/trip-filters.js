import dayjs from 'dayjs';

export const createTripFiltersTemplate = (points = []) => {
  const pointsFuture = points.filter((item) => dayjs(item.dateFrom).isAfter(dayjs(), 'day'));
  const pointsPast = points.filter((item) => dayjs(item.dateFrom).isBefore(dayjs(), 'day'));

  return `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything">Everything (${points.length})</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
    <label class="trip-filters__filter-label" for="filter-future">Future (${pointsFuture.length})</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
    <label class="trip-filters__filter-label" for="filter-past">Past (${pointsPast.length})</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};
