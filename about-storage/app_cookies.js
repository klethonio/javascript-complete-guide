const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const userId = 'u123';
const user = {
  name: 'Klethonio',
  age: 29,
  hobbies: ['Sports', 'Cooking'],
};

storeBtn.addEventListener('click', () => {
  // max-age [seconds] | expires [date]
  document.cookie = `uid=${userId}; max-age=60`;
  document.cookie = `user=${JSON.stringify(user)}`;
});

retrieveBtn.addEventListener('click', () => {
  const cookieData = document.cookie.split(';');
  const data = cookieData.map((i) => i.trim());
  console.log(data[1].split('=')[1]);
});
