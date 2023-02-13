import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DetailsForm from '../components/DetailsForm';

export default class Details extends Component {
  state = {
    product: [],
    productId: '',
    productsCart: [],
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
    const { product, productId } = this.state;
    return (
      <>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        { product.map((e) => (
          <>
            <p data-testid="product-detail-name">{ e.title }</p>
            <img
              data-testid="product-detail-image"
              src={ e.thumbnail }
              alt={ e.title }
            />
            <p data-testid="product-detail-price">{ e.price }</p>
            <button
              data-testid="product-detail-add-to-cart"
              onClick={ () => this.addToCart(e) }
            >
              Adicionar ao carrinho
            </button>
          </>
        ))}
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
