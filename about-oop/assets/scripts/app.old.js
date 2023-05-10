const productList = {
  products: [
    {
      title: 'A pillow',
      imageUrl:
        'https://m.media-amazon.com/images/I/71ZO-VnYA2L._AC_SL1500_.jpg',
      price: 9.99,
      descritpion: 'A soft pillow',
    },
    {
      title: 'A carpet ',
      imageUrl:
        'https://m.media-amazon.com/images/I/81WcoED8NoL._AC_SL1500_.jpg',
      price: 39.99,
      descritpion: 'A funny carpet',
    },
  ],
  render() {
    const app = document.getElementById('app');
    const list = document.createElement('ul');
    list.className = 'product-list';

    for (const product of this.products) {
      const el = document.createElement('li');
      el.className = 'product-item';
      el.innerHTML = `
        <div>
          <img src="${product.imageUrl}" alt="${product.title}" >
          <div class="product-item__content">
            <h2>${product.title}</h2>
            <h3>\$${product.price}</h3>
            <p>${product.descritpion}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
      list.appendChild(el);
    }

    app.appendChild(list);
  },
};

productList.render();
