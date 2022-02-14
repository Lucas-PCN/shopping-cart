const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
