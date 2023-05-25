const productListEl = document.getElementById('product-list');

function createElement(product, prodId, deleteProductFn) {
  const newListEl = document.createElement('li');
  newListEl.id = prodId;
  // IMPORTANT NOTE: You must sanatize this inputs, it was ignored to focus in the performance subject
  newListEl.innerHTML = `
    <h2>${product.title}</h2>
    <p>${product.price}</p>
  `;

  const prodDeleteButtonEl = document.createElement('button');
  prodDeleteButtonEl.textContent = 'DELETE';
  prodDeleteButtonEl.addEventListener('click', deleteProductFn.bind(null, prodId));

  newListEl.appendChild(prodDeleteButtonEl);

  return newListEl;
}

export function renderProducts(products, deleteProductFn) {
  productListEl.innerHTML = '';
  products.forEach(product => {
    const newListEl = createElement(product, product.id, deleteProductFn);
    productListEl.appendChild(newListEl);
  });
  // const startTime = performance.now();
  // for (let i = 0; i < products.length; i++) {
  //   const newListEl = createElement(products[i], products[i].id, deleteProductFn);
  //   productListEl.appendChild(newListEl);
  // }
  // const endTime = performance.now();
  // console.log(endTime - startTime);
}

export function updateProducts(product, prodId, deleteProductFn, isAdding) {
  if (isAdding) {
    const newListEl = createElement(product, prodId, deleteProductFn);
    productListEl.insertAdjacentElement('afterbegin', newListEl);
  } else {
    const productEl = document.getElementById(prodId);
    productEl.remove();
    // productEl.parentElement.removeChild(productEl); // old browser support
  }
}
