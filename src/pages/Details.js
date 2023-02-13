import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DetailsForm from '../components/DetailsForm';
// import ButtonAddToCart from '../components/ButtonAddToCart';

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
    const { product, productsCart } = state;
    this.setState({
      product: [product],
      productId: product.id,
      productsCart,
    });
  };

  addToCart = (product) => {
    if (!product) return; // algo chama a func e passa undefined antes do click;
    let localProductsCart = JSON.parse(localStorage.getItem('productsCart') || '[]');
    localProductsCart = [...localProductsCart, product];
    this.setState({ productsCart: localProductsCart });
    localStorage.setItem('productsCart', JSON.stringify(localProductsCart));
    // console.log('Produto adicionado ao cart:', product);
  };

  render() {
    const { product, productId, productsCart } = this.state;
    return (
      <>
        <Link
          to={ {
            pathname: '/cart',
            state: { productsCart },
          } }
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        { product.map((e) => (
          <>
            {console.log(e)}
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
      productList: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        thumbnail: PropTypes.string,
        price: PropTypes.number,
        id: PropTypes.string,
      })),
      productsCart: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        thumbnail: PropTypes.string,
        price: PropTypes.number,
        id: PropTypes.string,
      })),
      product: PropTypes.objectOf(PropTypes.shape({
        title: PropTypes.string,
        thumbnail: PropTypes.string,
        price: PropTypes.number,
        id: PropTypes.string,
      })),
    }),
  }).isRequired,
};
