import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { productList } = this.props;
    return (
      <div>
        {productList.map(({ title, thumbnail, price }, index) => (
          <div key={ index } data-testid="product">
            <p>{ title }</p>
            <img src={ thumbnail } alt={ title } />
            <p>{ price }</p>
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
