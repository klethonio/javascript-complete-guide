const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const userId = 'u123';
const user = {
  name: 'Klethonio',
  age: 29,
  hobbies: ['Sports', 'Cooking'],
};

let db;
const dbRequest = indexedDB.open('StorageDummy', 1);

dbRequest.onsuccess = (event) => {
  db = event.target.result;
};

dbRequest.onupgradeneeded = (event) => {
  db = event.target.result;

  const objStore = db.createObjectStore('products', { keyPath: 'id' });

  objStore.transaction.oncomplete = (event) => {
    const productsStore = db
      .transaction('products', 'readwrite')
      .objectStore('products');

    productsStore.add({
      id: 'p1',
      title: 'A First Product',
      price: 12.99,
      tags: ['Expensive', 'Luxury'],
    });
  };
};

dbRequest.onerror = (event) => {
  console.log('ERROR: ', event);
};

storeBtn.addEventListener('click', () => {
  if (!db) {
    return;
  }
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');

  productsStore.add({
    id: 'p2',
    title: 'A Second Product',
    price: 122.99,
    tags: ['Expensive', 'Luxury'],
  });
});

retrieveBtn.addEventListener('click', () => {
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');

  const request = productsStore.get('p1');

  request.onsuccess = function () {
    // console.log(request.result);
    // the code below can't be used with arrow functions
    console.log(this.result);
  };
});
