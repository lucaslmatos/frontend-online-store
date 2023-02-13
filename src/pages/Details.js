import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DetailsForm from '../components/DetailsForm';
import ProductCard from '../components/ProductCard';

export default class Details extends Component {
  state = {
    product: [],
    productId: '',
  };

  componentDidMount() {
    this.refreshState();
  }

  refreshState = () => {
    const { location } = this.props;
    const { state } = location;
    const { product } = state;
    this.setState({
      product: [product],
      productId: product.id,
    });
  };

  render() {
    const { product, productId } = this.state;
    return (
      <>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        <ProductCard productList={ product } />
        <DetailsForm productId={ productId } />
      </>
    );
  }
}

Details.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      product: PropTypes.objectOf(PropTypes.shape({
        title: PropTypes.string,
        thumbnail: PropTypes.string,
        price: PropTypes.number,
        id: PropTypes.string,
      })),
    }),
  }).isRequired,
};
