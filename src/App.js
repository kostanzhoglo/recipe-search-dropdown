import React, { Component } from 'react';
import './App.css';
import RecipeListContainer from './containers/RecipeListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RecipeListContainer />
      </div>
    );
  }
}

export default App;
