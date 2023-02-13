const CART_PRODUCTS_KEY = 'cart_products';

if (!JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY))) {
  localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify([]));
}
const readProductList = () => JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY));

const saveProductsList = (productList) => localStorage
  .setItem(CART_PRODUCTS_KEY, JSON.stringify(productList));

export const getProductCartList = () => {
  const productList = readProductList();
  return productList;
};

export const addProduct = (product) => {
  if (product) {
    const productList = readProductList();
    const itemCheck = productList.some((p) => p.id === product.id);
    if (!itemCheck) {
      saveProductsList([...productList, product]);
    }
  }
};

export const removeProduct = (product) => {
  const productList = readProductList();
  saveProductsList(productList.filter((p) => p.id !== product.id));
};
