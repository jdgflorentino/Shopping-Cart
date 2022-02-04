const getSavedCartItems = () => {
  const cart = localStorage.getItem('cartItems');
  return cart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
