const movieList = document.getElementById('movie-list');

// movieList.style.backgroundColor = 'red';
// movieList.style['backgroundColor'] = 'red';
movieList.style['background-color'] = 'red';
movieList.style.display = 'block';

const userInputField = 'level';

let person = {
  name: 'Klethonio',
  age: 29,
  hobbies: ['Sports', 'Conding'],
  [userInputField]: 'admin',
  greet: () => {
    alert('Smooth on the ship?')
  },
  1.5: 'Any number'
};

// person.greet();

person.isAdmin = true;

// person.age = undefined; // never use
delete person.age;

const keyName = 'name';

console.log(person);
console.log(person.name, person['name'], person[keyName]);
console.log(person[1.5], person['1.5']);