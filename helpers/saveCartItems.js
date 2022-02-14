const saveCartItems = (myCart) => {
  localStorage.setItem('cartItems', myCart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
