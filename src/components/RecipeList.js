import React from 'react';

const RecipeList = props => {
  console.log(props)
  return (
    <div className="recipeAnswers">
      {props.recipes.map((recipe) =>
        <div key={recipe.href}>
          <a href={recipe.href}>{recipe.title}
          </a>
        </div>
      )}
    </div>
  )
}

export default RecipeList;
