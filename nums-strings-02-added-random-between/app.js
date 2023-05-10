function randomIntBetween(min, max) {
  // min: 5, max: 10
  return Math.floor(Math.random() * (max - min + 1) + min); // 10.999999999999 => 10
}

console.log(randomIntBetween(1, 10));

const myName = 'Klethonio';

console.log(`My name is ${myName}`);

function productDescription(strings, productName, productPrice) {
  let priceCategory = 'pretty cheap';
  if (productPrice > 20) {
    priceCategory = 'fairly priced';
  }
  // return `${strings[0]}${productName}${strings[1]}${priceCategory}${strings[2]}`;
  return {name: prodName, price: prodPrice};
}

const prodName = 'Javascript Corse';
const prodPrice = 29.99;

const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;

console.log(productOutput);

console.log('REGULAR EXPRESSIONS');

const userInput = 'test@test.com';
const regex = /^\S+@\S+\.\S+$/;
console.log(regex.test(userInput));

// const newRegex = new RegExp('hello');
// const newRegex = new RegExp(/(h|H)ello/);
const newRegex = new RegExp(/.ello/);

console.log(newRegex.test(' ello...'));

