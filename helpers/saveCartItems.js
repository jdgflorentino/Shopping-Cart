const saveCartItems = (olList) => {
  localStorage.setItem('cartItems', olList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
