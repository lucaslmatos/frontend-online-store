import React, { Component } from 'react';
import { getCategories } from '../services/api';
// import Cart from '';

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
    this.setState({
      categories: data,
    });
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        <p
          data-testid="home-initial-message"
          id="inicialMessage"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <p>
          {categories.map((item) => (
            <label key={ item.id } htmlFor={ item.id } data-testid="category">
              <input
                type="radio"
                name="category"
                id={ item.id }
              />
            </label>
          ))}
        </p>
      </div>
    );
  }
}
