const defaultResult = 0;
let currentResult = defaultResult;

currentResult = currentResult + 10;

let calculationDescription = `${defaultResult} + 10`;
let errorMessage = 'An error \n' + 'occurred!';

outputResult(currentResult, calculationDescription);

// sum(1, 2);
// sum(5, 5);
// alert(sum(1, 2));

function sum(num1, num2) {
  const result = num1 + num2;
  // alert('The result is ' + result);
  return result;
}