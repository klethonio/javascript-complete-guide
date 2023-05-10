// Libary land
const uid = Symbol('uid');
console.log(uid);

const user = {
  // id: 'p1',
  [uid]: 'p1',
  name: 'Max',
  age: 20,
  [Symbol.toStringTag]: 'User',
};

console.log(user);

// App land
user.id = 'p2'; // this should not be possible

// don't display Symbol(uid)
for (const key in user) {
  console.log(key, user[key]);
}

console.log('well-known symbols');
console.log(user.toString());

// const company = {
//   currentEmployee: 0,
//   employees: ['Max', 'Manu', 'Anna'],
//   next() {
//     if (this.currentEmployee >= this.employees.length) {
//       return { value: this.currentEmployee, done: true };
//     }
//     const returnValue = { value: this.employees[this.currentEmployee], done: false };
//     this.currentEmployee++;
//     return returnValue;
//   },
// };

// console.log(company.next());
// console.log(company.next());
// console.log(company.next());
// console.log(company.next());
// console.log(company.next());

// let employess = company.next();

// while (!employess.done) {
//   console.log(employess.value);
//   employess = company.next();
// }

console.log('----- Generators & Iterators -----');

const company = {
  currentEmployee: 0,
  employees: ['Max', 'Manu', 'Anna'],
  [Symbol.iterator]: function* employeeGenarator() {
    let currentEmployee = 0;
    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee];
      currentEmployee++;
    }
  },
};

// const it = company.getEmploee();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

for (const employee of company) {
  console.log(employee);
}

// console.log([...company]);

const employees = ['Max', 'Manu', 'Anna'];

// it has a Symbol.iterator property
console.log(employees);

console.log('----- The Reflect API -----');

const course = {
  title: 'JavaScript - The Complete Guide',
};

Reflect.setPrototypeOf(course, {
  toString() {
    return this.title;
  },
});

// Reflect.deleteProperty(course, 'title');
// Object.deleteProperty(course, 'title'); // method doesn't exist

console.log(course.toString());

console.log('----- The Proxy API -----');

const courseHandler = {
  get(target, prop) {
    if (prop === 'length') return 0;
    console.log(prop);
    return target[prop] || 'Not Found';
  },
  set(target, prop, value) {
    // sending data to server...
    if (prop === 'rating') return;
    target[prop] = value;
    return true;
  },
};

const pCourse = new Proxy(course, courseHandler);

console.log(pCourse.title); // pCourse is unchanged, just as course is
console.log(pCourse.length);
console.log(pCourse.rating);
pCourse.rating = 5;
console.log(pCourse.rating);
