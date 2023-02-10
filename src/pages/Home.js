import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  state = {
    productsCart: [],
  };

  render() {
    const { productsCart } = this.state;
    return (
      <div>
        <Link
          to={ {
            pathname: '/cart',
            state: { productsCart },
          } }
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        <p
          data-testid="home-initial-message"
          id="inicialMessage"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}
