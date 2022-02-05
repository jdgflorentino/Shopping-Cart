const cart = document.querySelector('.cart__items');
const btnClear = document.querySelector('.empty-cart');
const parentCart = btnClear.parentNode;
const p = document.createElement('p');
p.className = 'total-price';
parentCart.insertBefore(p, btnClear);
let totalPrice = 0;

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

// percebi que não estava usando essa função que veio com o arquivo. Ela já captura o ID do produto.
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const getPrice = async (price) => {
  totalPrice += price;
  p.innerText = `${parseFloat(totalPrice.toFixed(2))}`;
};

btnClear.addEventListener('click', () => { 
  cart.innerHTML = ''; 
  localStorage.clear();
  p.innerHTML = 'Subtotal: 0.00';
}); 

function cartItemClickListener(event) {
  let price = event.target.getAttribute('value');
  price = Math.abs(price) * -1;
  getPrice(price);
  event.target.remove();
  saveCartItems(cart.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.setAttribute('value', salePrice);
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function getItems(event) {
  const itemId = getSkuFromProductItem(event.target.parentNode);
  const item = await fetchItem(itemId);
  cart.appendChild(createCartItemElement(item));
  getPrice(item.price);
  saveCartItems(cart.innerHTML);
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', getItems);
  section.appendChild(button);
  return section;
}

async function getProducts() {
  const allProducts = await fetchProducts('computador');
  const itens = document.querySelector('.items');
  allProducts.results.forEach((properties) => { 
    itens.appendChild(createProductItemElement(properties));
});
}

function loadLocalStorage() {
  if (!getSavedCartItems()) p.innerHTML = 'Subtotal: 0.00';
  cart.innerHTML = getSavedCartItems();
  const list = document.querySelectorAll('.cart__item');
  list.forEach((element) => element.addEventListener('click', cartItemClickListener));
}

function loadingText() {
  const sectionText = document.createElement('section');
  const section = document.querySelector('.items');
  sectionText.className = 'loading';
  sectionText.innerText = 'carregando...';
  section.appendChild(sectionText);
}

const load = async () => {
  loadingText();
  const sectionText = document.querySelector('.loading');
  await getProducts();
  sectionText.remove();
}; 

window.onload = () => {
  loadLocalStorage();
  load();
};
