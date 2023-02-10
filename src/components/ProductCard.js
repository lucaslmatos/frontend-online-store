import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const { productList } = this.props;
    return (
      <div>
        {/* title, thumbnail, price, id */}
        {productList.map((e, index) => (
          <div
            key={ index }
            data-testid="product"
          >
            <p data-testid="product-detail-name">{ e.title }</p>
            <img data-testid="product-detail-image" src={ e.thumbnail } alt={ e.title } />
            <p data-testid="product-detail-price">{ e.price }</p>
            <Link
              to={ () => ({
                pathname: `/details/${e.id}`,
                state: { product: e },
              }) }
              data-testid="product-detail-link"
            >
              Detalhes

            </Link>
          </div>
        ))}
      </div>
    );
  }
}

ProductCard.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  })).isRequired,
};
