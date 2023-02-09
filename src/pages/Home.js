import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class Home extends Component {
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
    const { categories } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <p
          data-testid="home-initial-message"
          id="inicialMessage"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <p>
          {categories.map((item) => (
            <label key={ item.id } data-testid="category" htmlFor={ item.id }>
              <input type="radio" name="category" id={ item.id } />
            </label>
          ))}
        </p>
      </div>
    );
  }
}
