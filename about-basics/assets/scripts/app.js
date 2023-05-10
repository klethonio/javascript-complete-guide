const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

addBtn.addEventListener('click', calcResult.bind(this, 'sum'));
subtractBtn.addEventListener('click', calcResult.bind(this, 'subtract'));
multiplyBtn.addEventListener('click', calcResult.bind(this, 'multiply'));
divideBtn.addEventListener('click', calcResult.bind(this, 'divide'));

function calcResult(type) {
  const number = getUserNumberInput();

  if (type !== 'sum' && type !== 'subtract' && type !=='multiply' && type !== 'divide' || !number) {
    return;
  }

  const initialResult = currentResult;
  let operator;

  if (type === 'sum') {
    currentResult += number;
    operator = '+';
  } else if (type === 'subtract') {
    currentResult -= number;
    operator = '-';
  } else if (type === 'multiply') {
    currentResult *= number;
    operator = '*';
  } else if (type === 'divide') {
    currentResult /= number;
    operator = '/';
  }

  createAndWriteOutput(operator, initialResult, number);
  writeToLog(type, initialResult, number, currentResult);
}

// function sum() {
//   calcResult('sum');
// }

// function subtract() {
//   calcResult('subtract');
// }

// function multiply() {
//   calcResult('multiply');
// }

// function divide() {
//   calcResult('divide');
// }

function getUserNumberInput() {
  return parseInt(userInput.value); // "+userInput.value" = "parseInt(userInput.value)"
}

function writeToLog(operarion, prevResult, number, result) {
  const logEntry = {
    operarion: operarion,
    prevResult: prevResult,
    number: number,
    result: result,
  };

  logEntries.push(logEntry);
  console.log(logEntry);
}

function createAndWriteOutput(operator, resultBefore, number) {
  const description = `${resultBefore} ${operator} ${number}`;

  outputResult(currentResult, description);
}
