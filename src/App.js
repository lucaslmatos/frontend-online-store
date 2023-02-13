import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Home from './pages/Home';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/details/:id" component={ Details } />
        <Route path="/cart" component={ Cart } />
        <Route path="/" component={ Home } />
      </Switch>
    );
  }
}
