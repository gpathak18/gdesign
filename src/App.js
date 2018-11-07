import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './containers/Dashboard';
import store from './containers/store'

class App extends Component {
  render() {
    return (
      <Dashboard state={store}></Dashboard>
    );
  }
}

export default App;
