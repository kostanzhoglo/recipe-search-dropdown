import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

require("../index.css")

class RecipeSearch extends Component {
  // majority of the autocomplete code comes from: https://alligator.io/react/react-autocomplete/
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      userInput: "",
      typing: false,
      timeout: 0,
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    
    // console.log(userInput)

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // This answer on SO helped with delaying API call: https://stackoverflow.com/questions/42217121/searching-in-react-when-user-stops-typing
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
      typing: false,
      timeout: setTimeout(() => {
        this.submitQueryToParent(this.state.userInput);
      }, 2000)
    });
  };

  submitQueryToParent = () => {
    if (this.state.userInput === "") {
      return;
    } else {
      this.props.getRecipes(this.state.userInput);
    }
  }

  onClick = e => {
    // to prevent state.timeout from sending additional API call.
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
    }

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      timeout: setTimeout(() => {
        this.submitQueryToParent(this.state.userInput);
      }, 0)
    });
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default RecipeSearch;
