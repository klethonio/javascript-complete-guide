const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const userId = 'u123';
const user = {
  name: 'Klethonio',
  age: 29,
  hobbies: ['Sports', 'Cooking'],
};

storeBtn.addEventListener('click', () => {
  sessionStorage.setItem('uid', userId);
  localStorage.setItem('user', JSON.stringify(user));
});

retrieveBtn.addEventListener('click', () => {
  const extractedId = sessionStorage.getItem('uid');
  const extractedUser = JSON.parse(localStorage.getItem('user'));

  if (extractedUser) {
    console.log(extractedUser);
  } else {
    console.log('Could not find user.');
  }

  if (extractedId) {
    console.log(`Got the id - ${userId}`);
  } else {
    console.log('Could not find id.');
  }
});
