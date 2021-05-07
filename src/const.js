const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const OFFERS = {
  lugagge: {
    title: 'Add luggage',
    price: 30,
    name: 'lugagge',
  },
  comfort: {
    title: 'Switch to comfort class',
    price: 100,
    name: 'comfort',
  },
  meal: {
    title: 'Add meal',
    price: 15,
    name: 'meal',
  },
  seats: {
    title: 'Choose seats',
    price: 5,
    name: 'seats',
  },
  train: {
    title: 'Travel by train',
    price: 40,
    name: 'train',
  },
  business: {
    title: 'Upgrade to a business class',
    price: 120,
    name: 'business',
  },
  radio: {
    title: 'Choose the radio station',
    price: 60,
    name: 'radio',
  },
};

const OFFERS_OF_TYPE = {
  taxi: [OFFERS.business, OFFERS.radio],
  bus: [OFFERS.radio, OFFERS.seats, OFFERS.train],
  train: [OFFERS.seats, OFFERS.meal, OFFERS.comfort],
  ship: [OFFERS.seats, OFFERS.lugagge, OFFERS.comfort],
  transport: [OFFERS.seats, OFFERS.lugagge, OFFERS.comfort, OFFERS.train],
  drive: [OFFERS.comfort],
  flight: [OFFERS.seats, OFFERS.lugagge, OFFERS.comfort],
  'check-in': [],
  sightseeing: [OFFERS.train, OFFERS.seats],
  restaurant: [OFFERS.radio],
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export {
  TYPES,
  OFFERS,
  OFFERS_OF_TYPE,
  SortType
};
