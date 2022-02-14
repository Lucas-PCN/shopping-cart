require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('Verifica se ao executar a função fetchProducts com o argumento "computador" a fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  })

  it('Verifica se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  })

  it('Verifica se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })

  it('Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  })
});
