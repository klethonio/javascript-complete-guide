const arr = [1, 3, 54, 3, -10, 26, 18];

const GtFive = arr.filter(value => value > 5);
console.log(arr, GtFive);

const mappedArr = arr.map(value => ({num: value}));
console.log(mappedArr);

const reducedArr = arr.reduce((prev, next) => prev * next, 1);
console.log(reducedArr);

const findMax = (...numbers) => {
    return numbers.reduce((prev, next) => (prev > next ? prev : next), null);
}

const firstMaxNumber = findMax(...arr);
console.log(firstMaxNumber);

const findMaxAndMin = (...numbers) => {
  const max = numbers.reduce((prev, next) => (prev > next ? prev : next), null);
  const min = numbers.reduce((prev, next) => (prev < next ? prev : next), null);
  return [max, min];
}

const [maxNumber, minNumber] = findMaxAndMin(...arr);
console.log(maxNumber, minNumber);

const ids = new Set();
ids.add(10);
ids.add(3);
ids.add(7);
ids.add(7);
console.log(ids);