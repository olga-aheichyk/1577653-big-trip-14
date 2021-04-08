export const createTripInfoCostTemplate = (points = []) => {
  const tripBasicCost = points
    .map((point) => point.basePrice)
    .reduce((sum, item) => sum + item, 0);

  const tripAdditionalCost = points
    .map((point) => {
      if (point.offers) {
        return point.offers;
      }
      return 0;
    })
    .map((array) => array.map((offer) => offer.price).reduce((sum, item) => sum + item, 0))
    .reduce((sum, item) => sum + item, 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripBasicCost + tripAdditionalCost}</span>
    </p>`;
};

