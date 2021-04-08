export const createTripInfoMainTemplate = (points = []) => {
  const tripCityes = points.map((point) => {
    return point.info.name;
  }).join(' &mdash; ');
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${tripCityes}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>`;
};
