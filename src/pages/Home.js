import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

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

  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.setCategories();
  }

  setCategories = async () => {
    const data = await getCategories();
    this.setState({ categories: data });
  };

  render() {
    return (
      <div>
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
