// BEST CASE: [5] => O(1)
// [3, 1] => O(n)
// [3, 1, 2] => O(n) ...
function getMin(numbers) { // [3, 1, 2]
  if (!numbers.length) { // 1 execution
    throw new Error('Should not be an empty array!');
  }

  let currentMinimum = numbers[0]; // 1 execution

  for (let i = 1; i < numbers.length; i++) { // 1 execution
    if (numbers[i] < currentMinimum) {// 2 executions
      currentMinimum = numbers[i]; // 1 execution
    }
  }

  return currentMinimum; // 1 execution
}

// T = n => Liner Time complexity => O(n^2)

// BEST CASE: [1, 2, 3] (Ordered arary) => O(n^2) - extras
// WORST CASE: [3, 2, 1] => O(n^2) + extras
// AVERAGE CASE: [...n] => O(n^2)
function getMin2(numbers) {
  if (!numbers.length) {
    throw new Error('Should not be an empty array!');
  }

  for (let i = 0; i < numbers.length; i++) { // n times executions
    let outerElement = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) { // n times executions
      let innerElement = numbers[j];

      if (outerElement > innerElement) {
        numbers[i] = innerElement;
        numbers[j] = outerElement;
        outerElement = numbers[i];
        innerElement = numbers[j];
      }
    }
  }

  return sortedNumbers[0];
}

// Quandratic Time Complexity => n * n => O(n^2)

// const testNumbers = [3, 1, 2];
// const testNumbers = [3];
// const testNumbers = [];
// const testNumbers = [1, 5, 1];
// const testNumbers = [5, 1, 5];
const testNumbers = [10, -5, 100, 99, -2];

const min = getMin(testNumbers);

console.log(min);
