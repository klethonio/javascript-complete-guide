class Animal {
  printAge() {
    console.log(this.age);
  }
}

class Person extends Animal {
  static species = 'Human';

  name = 'Klethonio';

  constructor() {
    super();
    this.age = 29;
  }

  // this uses more memory
  // although if you use arrow function you make sure that 'this' will be Person class
  greetArrow = () => {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  };

  // on the other hand, this has a better performance, but you need to use bind()
  greet() {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }
}

// old way
// function Animal() {
//   this.printAge = function () {
//     console.log(this.age);
//   };
// }

// function Person() {
//   // this = {}; // keep commented
//   this.age = 30;
//   this.name = 'Klethonio';
//   // was replaced by that function right below to improve performace
//   // that way that method is only created once
//   this.greet = function () {
//     console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
//   };
//   // return this; // keep commented
// }

// sets a static prop
Person.species = 'Human';

Person.prototype = new Animal();
// do the "same" as if we were defining a method inside a class
Person.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
};

const person = new Person();
person.printAge();
person.greet();

console.log(person);

const btn = document.getElementById('btn');
btn.addEventListener('click', person.greet.bind(person)); // it needs to use bind
btn.addEventListener('click', person.greetArrow); // it works

console.log('-----------------------');

const course = {
  title: 'JavaScript - The Complete Guide',
  rating: 5,
};

// you should not use __proto__ for production, only for debugging
// console.log(Object.getPrototypeOf(course) == course.__proto__);

Object.setPrototypeOf(course, {
  // ...Object.getPrototypeOf(course), // not need
  printRating: function () {
    console.log(`${this.rating}/5`);
  },
});

course.printRating();

// that params will be the prototype of student
const student = Object.create({
  printProgress: function () {
    console.log(this.progress);
  },
});

student.name = 'Klethonio';
Object.defineProperty(student, 'progress', {
  // you need to define all properties! But you can use ...spread, if you sth to spread
  configurable: true,
  enumerable: true,
  value: 0.8,
  writable: true,
});
// delete student.progress;
student.progress = 1;

console.log(student);


// that params will be the prototype of student
const teacher = Object.create({
  printRating: function () {
    console.log(this.rating);
  },
}, {
  name: {
    configurable: true,
    enumerable: true,
    value: 'Max',
    writable: true,
  },
  rating: {
    configurable: true,
    enumerable: true,
    value: 5,
    writable: true,
  }
});

console.log(teacher);
