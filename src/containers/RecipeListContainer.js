import React, { Component } from 'react';
import RecipeSearch from '../components/RecipeSearch';
import RecipeList from '../components/RecipeList';
import ingredients from '../data/Ingredients'

class RecipeListContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }

  render() {
    return (
      <div>
        <h1>I'm Hungry and in an Adventurous Mood!</h1>
        <h2>Type some ingredients & search for a recipe.</h2>
        <div>
          When you're done typing, either click a suggestion, or simply wait, and the search results will appear in a moment...
        </div>
        <RecipeSearch
          getRecipes={this.getRecipes}
          suggestions={ingredients}
        />
        <RecipeList recipes={this.state.recipes} />
      </div>
    )
  }

  getRecipes = (userInput) => {
    // console.log(userInput)
    // Two websites helped me with CORS issue when fetching w/o a backend:
    // 1) https://github.com/Rob--W/cors-anywhere
    // 2) https://stackoverflow.com/questions/29670703/how-to-use-cors-anywhere-to-reverse-proxy-and-add-cors-headers
    fetch(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?q=${userInput}`)
      .then(res => res.json())
      .then(response => {this.setState({ recipes: response.results})
      }
    )
  }
}

export default RecipeListContainer
