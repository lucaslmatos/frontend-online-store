import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    searchText: '',
    noSearched: false,
    category: '',
    productList: [],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { searchText, category } = this.state;
    const response = await getProductsFromCategoryAndQuery(category, searchText);
    const data = response.results;
    this.setState({
      productList: data,
      noSearched: true,
    });
  };

  render() {
    const { searchText, productList, noSearched } = this.state;

    return (
      <div>
        <input
          type="text"
          name="searchText"
          value={ searchText }
          onChange={ this.handleChange }
          data-testid="query-input"
        />
        <button
          data-testid="query-button"
          name="searchButton"
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        { (productList.length === 0 && noSearched)
        && <h2>Nenhum produto foi encontrado</h2> }
        { (productList.length === 0 && !noSearched) && (
          <p
            data-testid="home-initial-message"
            id="inicialMessage"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        <ProductCard productList={ productList } />
      </div>
    );
  }
}
