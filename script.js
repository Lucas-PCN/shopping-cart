const classe = '.cart__items';
const sectionCart = document.querySelector(classe);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const sumPrice = () => {
  const cartItems = document.querySelectorAll('li');
  let sum = 0;
  cartItems.forEach((item) => {
    const text = item.innerHTML;
    const splits = text.split('$');
    const numberString = splits[1];
    sum += Number(numberString);
  });
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerText = sum;
};

function cartItemClickListener(event) {
  event.target.remove();
  const cart = document.querySelector(classe);
  saveCartItems(cart.innerHTML);
  sumPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function deleteCartItems() {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    const cartMoment = document.querySelector(classe);
    cartMoment.innerHTML = '';
    saveCartItems(cartMoment.innerHTML);
    sumPrice();
  });
}

async function createProducts() {
  const sectionItems = document.querySelector('.items');
  const request = await fetchProducts('computador');
  request.results.forEach((element) => {
    const objParam = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    sectionItems.appendChild(createProductItemElement(objParam));
  });
}

async function createCartItems(event) {
  const productSku = event.target.parentNode.firstChild.innerText;
  const request = await fetchItem(productSku);
  const objParam2 = {
    sku: request.id,
    name: request.title,
    image: request.thumbnail,
    salePrice: request.price,
  };
  sectionCart.appendChild(createCartItemElement(objParam2));
  const cartItem = document.querySelector(classe);
  saveCartItems(cartItem.innerHTML);
  sumPrice();
}

function click() {
  const sectionItems = document.querySelector('.items');
  sectionItems.addEventListener('click', (e) => {
    if (e.target.className === 'item__add') {
      createCartItems(e);
    }
  });
}

function reload() {
  const carrinhoAtual = document.querySelector(classe);
  carrinhoAtual.innerHTML = localStorage.getItem('cartItems');
  const lis = document.querySelectorAll('li');
  lis.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
}

window.onload = async () => {
  const loading = document.querySelector('.loading');
  await createProducts();
  loading.remove();
  click();
  deleteCartItems();
  if (localStorage.length > 0) {
    reload();
    sumPrice();
  }
};
