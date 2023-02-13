import React, { Component } from 'react';

export default class ButtonAddToCart extends Component {
  state = {
    produtosNoCarrinho: [],
  };

  addToCart = (product) => {
    if (!product) return; // algo chama a func e passa undefined antes do click;
    const { produtosNoCarrinho } = this.state;
    const newProducts = [...produtosNoCarrinho, product.productToAdd];
    // console.log(produtosNoCarrinho)
    // console.log(newProducts);
    this.setState({ produtosNoCarrinho: [...newProducts] });
    localStorage.setItem('produtosNoCarrinho', JSON.stringify(newProducts));
    // console.log('Produto adicionado ao cart:', product);
  };

  render() {
    const productToAdd = this.props;
    return (
      <button
        data-testid="product-add-to-cart"
        onClick={ () => this.addToCart(productToAdd) }
      >
        Adicionar ao Carrinho
      </button>
    );
  }
}
