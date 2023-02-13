// Adicionar em cada produto exibido na tela. Se adicionar no componet ProductCard, ficará inutilizável para o carrinho
<button
  data-testid="product-detail-add-to-cart"
>
  Adicionar ao carrinho
</button>;

// Modificações Cart.js:
// 1: Adiciona const showProductsCart
// 2: Implementa showProductsCart na condicional do carrinho vazio
