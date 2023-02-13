import React, { Component } from 'react';

export default class ButtonAddToCart extends Component {
  state = {
    productsCart: [],
  };

  addToCart = (product) => {
    if (!product) return; // algo chama a func e passa undefined antes do click;
    const { productsCart } = this.state;
    // console.log(productsCart);
    const newProducts = [...productsCart, product];
    // console.log(newProducts);
    this.setState({ productsCart: newProducts });
    localStorage.setItem('productsCart', JSON.stringify(newProducts));
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
