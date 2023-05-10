class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // descritpion;
  // price;

  constructor(title, image, price, descritpion) {
    this.title = title;
    this.imageUrl = image; // it has a different name just to show that is they are diferent
    this.descritpion = descritpion;
    this.price = price;
  }

  // this method was called before in ProductLi
  addToCart() {
    App.cart.addProduct(this);
  }
}

class ElementAttribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Component {
  constructor(hookId) {
    this.hookEl = hookId && document.getElementById(hookId);
  }

  createRootElement(tag, classes, attributes) {
    const rootEl = document.createElement(tag);

    if (classes) {
      rootEl.className = classes;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootEl.setAttribute(attr.name, attr.value);
      }
    }

    if (this.hookEl) {
      this.hookEl.appendChild(rootEl);
    }

    return rootEl;
  }
}

class ShoppingCart extends Component {
  _items = [];
  _totalOutput;

  constructor(hookId) {
    super(hookId);
    this._totalOutput = document.createElement('h2');
    this._totalOutput.textContent = 'Total: $0.00';
  }

  set cartItems(item) {
    this._items = item;
    this._totalOutput.textContent = `Total: \$${this.totalAmount}`;
  }

  get items() {
    return this._items;
  }

  // remember this, nice feature! can use bind where it is called as well.
  addProduct = (product) => {
    // this._items.push(product);
    // the code bellow was used just to show how set works
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  };

  checkout() {
    console.log('Ordering...');
    console.log(this.items);
  }

  render() {
    // const cartEl = document.createElement('section');
    // cartEl.className = 'cart';
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.appendChild(this._totalOutput);

    const checkoutBtn = document.createElement('button');
    checkoutBtn.textContent = 'Checkout';
    checkoutBtn.addEventListener('click', () => this.checkout());
    cartEl.appendChild(checkoutBtn);
  }

  // created by me
  get totalAmount() {
    const sum = this._items.reduce((partial, item) => partial + item.price, 0);
    return sum.toFixed(2);
  }
}

class ProductLi extends Component {
  constructor(product) {
    super(null);
    this.product = product;
    // this.el = document.createElement('li');
    // this.el.className = 'product-item';
    this.el = this.createRootElement('li', 'product-item');
    // 1 - populate element in another method
    this.el.innerHTML = `
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
    // const addCardBtn = this.el.querySelector('button');
    // addCardBtn.addEventListener('click', this.product.addToCart.bind(this.product));
  }

  buildElement() {
    return this.el;
  }
}

class ProductList extends Component {
  _products = [
    new Product(
      'A pillow',
      'https://m.media-amazon.com/images/I/71ZO-VnYA2L._AC_SL1500_.jpg',
      9.99,
      'A soft pillow'
    ),
    new Product(
      'A carpet',
      'https://m.media-amazon.com/images/I/81WcoED8NoL._AC_SL1500_.jpg',
      39.99,
      'A funny carpet'
    ),
  ];

  // needed when listener is used
  constructor(hookId, addToCart) {
    super(hookId);
    this.addToCart = addToCart;
  }

  render() {
    // const list = this.createElement('ul');
    // list.className = 'product-list';
    const list = this.createRootElement('ul', 'product-list'); // put into the constructor maybe

    const fragment = document.createDocumentFragment();

    for (const product of this._products) {
      const productLi = new ProductLi(product);
      fragment.appendChild(productLi.buildElement());
    }

    list.appendChild(fragment);

    list.addEventListener('click', (event) => {
      if (event.target.matches('button')) {
        const productEl = event.target.closest('.product-item');
        const productIdx = Array.from(productEl.parentNode.children).indexOf(
          productEl
        );
        const product = this._products[productIdx];
        this.addToCart(product);
      }
    });
  }
}

class Shop {
  constructor() {
    this.cart = new ShoppingCart('app');
  }

  render() {
    const app = document.getElementById('app');
    this.cart.render();
    // need to pass this.cart.addToCart if listener in ProductList is used
    const productList = new ProductList('app', this.cart.addProduct);
    productList.render();

    // app.appendChild(productListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
    shop.render();
  }

  // this method was called before in Product
  // static addProductToCart(product) {
  //   this.cart.addProduct(product);
  // }
}

App.init();
