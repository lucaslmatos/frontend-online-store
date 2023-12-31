import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    searchText: '',
    noSearched: false,
    productList: [],
    categories: [],
    productsCart: [],
  };

  componentDidMount() {
    this.setCategories();
    this.addToCart();
  }

  addToCart = (product) => {
    if (!product) return; // algo chama a func e passa undefined antes do click;
    let localProductsCart = JSON.parse(localStorage.getItem('productsCart') || '[]');
    localProductsCart = [...localProductsCart, product];
    this.setState({ productsCart: localProductsCart });
    localStorage.setItem('productsCart', JSON.stringify(localProductsCart));
    // console.log('Produto adicionado ao cart:', product);
  };
  // addToCart = (product) => {
  //   const { productsCart } = this.state;
  //   console.log(productsCart);
  //   this.setState((previousState) => ({
  //     productsCart: [...previousState.productsCart, product],
  //   }));
  //   localStorage.setItem('productsCart', JSON.stringify([...productsCart, product]));
  //   console.log('Produto adicionado ao cart:', product);
  // };

  setCategories = async () => {
    const data = await getCategories();
    this.setState({ categories: data });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (itemId) => {
    const { searchText } = this.state;
    const categoryId = itemId;
    const response = await getProductsFromCategoryAndQuery(categoryId, searchText);
    const data = response.results;
    this.setState({
      productList: data,
      noSearched: true,
    });
  };

  render() {
    const { searchText, productList, noSearched, categories,
      productsCart } = this.state;
    // const { addToCart } = this.props;
    return (
      <div>
        <Link
          to={ {
            pathname: '/cart',
            state: { productsCart },
          } }
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        <p>
          {categories.map((item) => (
            <label key={ item.id } data-testid="category" htmlFor={ item.id }>
              <input
                type="radio"
                name="category"
                value={ item.id }
                id={ item.id }
                onChange={ this.handleChange }
                onClick={ () => this.handleClick(item.id) }
              />
              { item.name }
            </label>
          ))}
        </p>
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
        <ProductCard
          addToCart={ this.addToCart }
          productList={ productList }
          productsCart={ productsCart }
        />
      </div>
    );
  }
}
