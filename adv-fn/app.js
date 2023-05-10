// pure function
function add(num1, num2) {
  return num1 + num2;
}

console.log(add(1, 5));
console.log(add(12, 15));

function addRandom(num1) {
  // impure function
  return num1 + Math.random();
}

console.log(addRandom(5));

let previousResult = 0;

function addMore(num1, num2) {
  const sum = num1 + num2;
  // impure function
  previousResult = sum;
  return sum;
}

const hobbies = ['Sports', 'Coding'];

function printHobbies(hbbs) {
  // impure function
  hbbs.push('New hobby');
  console.log(hbbs);
}

console.log(hobbies);

// function calculateTax(amount, tax) {
//   return amount * tax;
// }

// const vatAmount = calculateTax(100, 0.19);
// const incomeTax = calculateTax(100, 0.25);

let multiplier = 1.1;
let multiplier2 = 1.3;

// FACTORY FUNCTION
function createTaxCalculator(tax) {
  // CLOSURE FUNCTION - It uses an outer parameter, variable (multiplier)
  // could be "max" as well, but this parameter doesn't change after fn creation
  function calculateTax(amount, mult = multiplier2) {
    console.log(multiplier, mult);
    console.log('tax:', tax);
    return amount * tax * multiplier;
  }

  // now it changes!
  tax = 0.3;

  return calculateTax;
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTax = createTaxCalculator(0.25);

console.dir(calculateVatAmount);

// multiplier and multiplier2 are updated
multiplier = 1.2;
multiplier2 = 1.4;

console.log(calculateVatAmount(100));
console.log(calculateIncomeTax(200));

console.dir(calculateVatAmount);

let userName = 'Klethonio';

// CLOSURE FUNCTION
function greetUser() {
  // yet retrivies "Hi João", because this assignment are done after the changing
  const name = userName;
  // let lastName = 'Lacerda';
  console.log(`Hi ${name} ${lastName}`);
}

userName = 'José';
let lastName = 'Silva';

greetUser();

// function powerOf(x, n) {
//   let result = 1;
//   for (let i = 0; i < n; i++) {
//     result *= x;
//   }
//   return result;
// }

function powerOf(x, n) {
  // if (n === 1) {
  //   return x;
  // }
  // return x * powerOf(x, n - 1);

  return n === 1 ? x : x * powerOf(x, n - 1);
}

console.log(powerOf(2, 3)); // 2 * 2 * 2

console.log('Advanced recursive');

const myself = {
  name: 'Klethonio',
  friends: [
    {
      name: 'João',
      friends: [
        {
          name: 'Pedro',
          friends: [
            {
              name: 'Carlos'
            },
            {
              name: 'Rick'
            }
          ]
        }
      ]
    },
    {
      name: 'José'
    }
  ]
};

function getFriendNames(person) {
  let collectedNames = [];

  if (person.friends && person.friends.length > 0) {
    for (const friend of person.friends) {
      collectedNames.push(friend.name);
      collectedNames.push(...getFriendNames(friend));
      // collectedNames = collectedNames.concat(getFriendNames(friend));
    }
  }

  return collectedNames;
}

console.log(getFriendNames(myself));

arr =  ['foo', 'bar'];
otherArr = ['baz'];
arr = arr.concat(otherArr);

console.log(arr);
