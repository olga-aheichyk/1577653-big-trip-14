export default class Offers {
  constructor() {
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getOffers() {
    return this._offers;
  }

  static adaptToClient(offer) {
    //const offerIndex = this.getOffers().findIndex(offer);
    const adaptedOffer = Object.assign(
      {},
      offer,
      {
        //name: `offer-${offerIndex}`,
        name: 'offer',
      },
    );

    return adaptedOffer;
  }

  static adaptToServer(offer) {
    const adaptedOffer = Object.assign({}, offer);

    delete adaptedOffer.name;

    return adaptedOffer;
  }
}
