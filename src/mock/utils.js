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
 * @param {array} array — исходный массив
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

export {
  getRandomInteger,
  getRandomElementFromArray,
  makeRandomArray
};
