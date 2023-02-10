import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class DetailsForm extends Component {
  state = {
    email: '',
    commentText: '',
    errorMessage: false,
    rating: 0,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { email, commentText, rating } = this.state;
    const { productId } = this.props;
    if (email.length === 0 || rating < 1) {
      this.setState({
        errorMessage: true,
      });
    } else {
      const ratingInfo = { email, text: commentText, rating };
      const ratingArray = JSON.parse(localStorage.getItem(productId) || '[]');
      ratingArray.push(ratingInfo);
      localStorage.setItem(productId, JSON.stringify(ratingArray));
      this.setState({
        commentText: '',
        rating: false,
        errorMessage: false,
        email: '',
      });
    }
  };

  render() {
    const { email, commentText, errorMessage } = this.state;
    const { productId } = this.props;
    const newRating = JSON.parse(localStorage.getItem(productId) || '[]');
    return (
      <>
        <form>
          <h1>Avalie o produto</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={ this.handleChange }
            value={ email }
            required
            data-testid="product-detail-email"
          />
          <label htmlFor="n1">
            1
            <input
              type="radio"
              onChange={ this.handleChange }
              data-testid="1-rating"
              value="1"
              id="1"
              name="rating"
              required
            />
          </label>
          <label htmlFor="n2">
            2
            <input
              type="radio"
              onChange={ this.handleChange }
              value="2"
              id="2"
              data-testid="2-rating"
              name="rating"
              required
            />
          </label>
          <label htmlFor="n3">
            3
            <input
              type="radio"
              onChange={ this.handleChange }
              value="3"
              data-testid="3-rating"
              id="3"
              name="rating"
              required
            />
          </label>
          <label htmlFor="n4">
            4
            <input
              type="radio"
              onChange={ this.handleChange }
              value="4"
              id="4"
              data-testid="4-rating"
              name="rating"
              required
            />
          </label>
          <label htmlFor="n5">
            5
            <input
              type="radio"
              onChange={ this.handleChange }
              data-testid="5-rating"
              value="5"
              id="5"
              name="rating"
              required
            />
          </label>
          <textarea
            onChange={ this.handleChange }
            value={ commentText }
            name="commentText"
            data-testid="product-detail-evaluation"
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleClick }
          >
            Enviar avaliação
          </button>
          { (errorMessage) && <p data-testid="error-msg"> Campos inválidos</p>}
        </form>

        <h1>Avaliações</h1>
        {newRating.map((e, i) => (
          <div key={ `${productId}${i} ` }>
            <p data-testid="review-card-email">{e.email}</p>
            <p data-testid="review-card-rating">{e.rating}</p>
            <p data-testid="review-card-evaluation">{e.text}</p>
          </div>
        ))}

      </>
    );
  }
}

DetailsForm.propTypes = {
  productId: PropTypes.string.isRequired,
};
