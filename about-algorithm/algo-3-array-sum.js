function sumUp(numbers) {
  let sum = 0; // 1 execution

  for (let i = 0; i < numbers.length; i++) { // n executions
    sum += numbers[i];
  }

  return sum; // 1 execution
}

// Liner Time Complexity => O(n)

// const array = [1, 2, 3];
const array = [1, 2, 5];

console.log(sumUp(array));