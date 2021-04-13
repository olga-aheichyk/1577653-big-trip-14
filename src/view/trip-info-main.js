import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

export const createTripInfoMainTemplate = (points = []) => {
  if (points.length !== 0) {

    const tripCityes = points.map((point) => {
      return point.info.name;
    }).join(' &mdash; ');

    const arrayFromStartDates = points.map((point) => dayjs(point.dateFrom));
    const arrayFromEndDates = points.map((point) => dayjs(point.dateTo));

    const startTripDay = dayjs.min(arrayFromStartDates).format('MMM DD');
    const endTripDay = dayjs.max(arrayFromEndDates).format('MMM DD');

    return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripCityes}</h1>
      <p class="trip-info__dates">${startTripDay}&nbsp;&mdash;&nbsp;${endTripDay}</p>
    </div>
    `;
  }

  return '';
};
