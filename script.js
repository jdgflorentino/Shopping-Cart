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

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | 
                  NAME: ${name} |
                  PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const cart = document.querySelector('.cart__items');

async function getItems(e) {
  const itemId = e.target.parentNode.children[0].innerHTML;
  const item = await fetchItem(itemId);
  cart.appendChild(createCartItemElement(item));
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

getProducts();

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {};
