import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    productsCartList: [],
  };

  componentDidMount() {
    // console.log('[PROPS] ', this.props);
    this.refreshState();
  }

  /* productsCart [0] ta passando como um objeto vazio */

  refreshState = () => {
    const { location } = this.props;
    const { state } = location;
    const { productsCartList } = state;
    // const { productsCart } = this.props.location.state;
    // // console.log(productsCart);
    this.setState({
      productsCartList,
    });
  };

  render() {
    const { productsCartList } = this.state;
    // console.log('[STATE] ', this.state);
    // console.log('[PROPS] ', this.props);
    const messageElement = (
      <h2
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio
      </h2>
    );
    return (
      // JSON.stringify(this.state)
      <div>
        { productsCartList.length === 0 ? messageElement : productsCartList
          .map((product) => (
            <div key={ product.id }>
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{ product.price }</p>
              <p data-testid="shopping-cart-product-quantity">{product.qtd}</p>
            </div>
          ))}
      </div>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      productsCartList: PropTypes.arrayOf(undefined),
    }),
  }).isRequired,
};
