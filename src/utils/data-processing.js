import dayjs from 'dayjs';

const getDuration = (from, to) => {
  const durationInMinutes = dayjs(to).diff(dayjs(from), 'minute');
  if (durationInMinutes < 60) {
    const minutes = durationInMinutes < 10 ? `0${durationInMinutes}` : durationInMinutes;
    return `${minutes}M`;
  }
  else if (durationInMinutes < 1440) {
    const durationInHours = Math.floor(durationInMinutes / 60);
    const minutesRest = durationInMinutes % 60;

    const hours = durationInHours < 10 ? `0${durationInHours}` : durationInHours;
    const minutes = minutesRest < 10 ? `0${minutesRest}` : minutesRest;

    return `${hours}H ${minutes}M`;
  }

  else if (durationInMinutes >= 1440) {
    const durationInDays = Math.floor(durationInMinutes / (60 * 24));
    const hoursRest = Math.floor((durationInMinutes % (24 * 60)) / 60);
    const minutesRest = (durationInMinutes % (24 * 60)) % 60;

    const days = durationInDays < 10 ? `0${durationInDays}` : durationInDays;
    const hours = hoursRest < 10 ? `0${hoursRest}` : hoursRest;
    const minutes = minutesRest < 10 ? `0${minutesRest}` : minutesRest;

    return `${days}D ${hours}H ${minutes}M`;
  }
};

// const updateItem = (items, update) => {
//   const index = items.findIndex((item) => item.id === update.id);

//   if (index === -1) {
//     return items;
//   }

//   return [
//     ...items.slice(0, index),
//     update,
//     ...items.slice(index + 1),
//   ];
// };

const sortByDateAscending = (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
const sortByDurationDescending = (a, b) => (dayjs(a.dateFrom).diff(dayjs(a.dateTo))) - (dayjs(b.dateFrom).diff(dayjs(b.dateTo)));
const sortByPriceDescending = (a, b) => b.basePrice - a.basePrice;


export {
  getDuration,
  // updateItem,
  sortByDateAscending,
  sortByPriceDescending,
  sortByDurationDescending
};
