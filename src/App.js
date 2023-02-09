import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';

export default class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/cart" component={ Cart } />
          <Route path="/" component={ Home } />
        </Switch>
      </>
    );
  }
}
