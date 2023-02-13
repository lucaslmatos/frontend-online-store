import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    productsCart: [],
  };

  componentDidMount() {
    // console.log('[PROPS] ', this.props);
    this.refreshState();
  }

  /* productsCart [0] ta passando como um objeto vazio */

  refreshState = () => {
    const { location } = this.props;
    const { state } = location;
    const { productsCart } = state;
    productsCart.forEach((product) => {
      product.qtd = 1;
    });
    const localProducts = JSON.parse(localStorage.getItem('productsCart') || '[]');
    localProducts.forEach((product) => {
      product.qtd = 1;
    });
    if (localProducts === []) {
      this.setState({
        productsCart,
      });
    } else {
      this.setState({
        productsCart: localProducts,
      });
    }
  };

  handleClick = ({ target: { name, id } }) => {
    const { productsCart } = this.state;
    if (name === 'increase') {
      productsCart.forEach((product) => {
        if (product.id === id) {
          product.qtd += 1;
        }
      });
      this.setState({
        productsCart,
      });
      localStorage.setItem('productsCart', JSON.stringify(productsCart));
    }
    if (name === 'decrease') {
      productsCart.forEach((product) => {
        if (product.id === id) {
          product.qtd -= 1;
        }
      });
      this.setState({
        productsCart,
      });
      localStorage.setItem('productsCart', JSON.stringify(productsCart));
    }
    if (name === 'remove') {
      const newCart = productsCart.filter((product) => product.id !== id);
      this.setState({
        productsCart: newCart,
      });
      localStorage.setItem('productsCart', JSON.stringify(newCart));
    }
  };

  render() {
    const { productsCart } = this.state;
    const cartValue = productsCart.map((product) => product.qtd * product.price);
    const min = 1;
    const messageElement = (
      <h2
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio
      </h2>
    );
    const returnMessage = (
      <div>
        {productsCart.map((product, index) => (
          <div
            key={ index }
            data-testid="product"
          >
            <p data-testid="shopping-cart-product-name">{ product.title }</p>
            <img
              data-testid="product-detail-image"
              src={ product.thumbnail }
              alt={ product.title }
            />
            <p data-testid="product-detail-price">{ product.price }</p>
            <div style={ { display: 'flex' } } key={ index }>
              <button
                name="decrease"
                id={ product.id }
                data-testid="product-decrease-quantity"
                disabled={ product.qtd === min }
                onClick={ this.handleClick }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">
                { product.qtd }
              </p>
              <button
                name="increase"
                id={ product.id }
                data-testid="product-increase-quantity"
                onClick={ this.handleClick }
              >
                +
              </button>
            </div>
            <div>
              <button
                name="remove"
                id={ product.id }
                data-testid="remove-product"
                onClick={ this.handleClick }
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    );

    return (
      <>
        <div>Cart</div>
        { productsCart.length === 0 ? messageElement
          : returnMessage }
        <div>
          <p>
            Valor total do carrinho:
            { cartValue.reduce((acc, cur) => acc + cur, 0)}
          </p>
          <button
            name="remove"
            data-testid="remove-product"
            onClick={ this.handleClik }
          >
            Finalizar compra
          </button>
        </div>
      </>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      productsCart: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
      })),
    }),
  }).isRequired,
};
