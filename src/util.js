import dayjs from 'dayjs';

/**
 * Функция получения случайного целого числа из диапазона включительно
 * @param {number} min — минимальное значение
 * @param {number} max — максимальное значение
 * @return {number|false} — случайное число
 */
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.random() * (max - min + 1) + min;
  return Math.floor(randomNumber);
};

/**
 * Функция получения случайного элемента из массива строк
 * @param {array} array — исходный массив строк
 * @return {string} — случайная строка
 */
const getRandomElementFromArray = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

/**
 * Функция получения массива случайной длины из массива строк
 * @param {array} array — исходный массив строк
 * @return {array} — полученный массив случайной длины
 */
const makeRandomArray = (array) => {
  const randomArray = [];

  array.forEach((element) => {
    if (Math.random() < 0.5) {
      randomArray.push(element);
    }
  });

  return randomArray;
};

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

export {
  getRandomInteger,
  getRandomElementFromArray,
  makeRandomArray,
  getDuration
};
