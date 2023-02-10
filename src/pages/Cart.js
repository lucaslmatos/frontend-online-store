import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    productsCart: [],
  };

  componentDidMount() {
    this.refreshState();
  }

  refreshState = () => {
    const { location } = this.props;
    const { state } = location;
    const { productsCart } = state;
    this.setState({
      productsCart,
    });
  };

  render() {
    const { productsCart } = this.state;
    const messageElement = (
      <h2
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio
      </h2>
    );
    return (
      <>
        <div>Cart</div>
        { productsCart.length === 0 ? messageElement
          : 'render'}

      </>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      productsCart: PropTypes.arrayOf(undefined),
    }),
  }).isRequired,
};
