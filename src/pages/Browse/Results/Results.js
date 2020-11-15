import React from "react";
import RecipeContainer from "../../../components/RecipeContainer/RecipeContainer";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import { useStorage, useStorageUpdate } from "../../../hooks/StorageContext";
import classes from "./Results.module.css";

const Results = () => {
  const { sessionResults, localResults } = useStorage();
  const { setLocalResults } = useStorageUpdate();

  const findRecipeMatch = (items, check) => [ items.find( item => item.id.toString() === check) ];

  const submitSaveHandler = e => {
    const recipeID = e.currentTarget.closest("li").id;
    const match = findRecipeMatch(sessionResults, recipeID);

    if (!localResults) return setLocalResults(match);
    if (localResults.some( recipe => recipe.id === match[0].id)) return;

    try {
        setLocalResults([ ...localResults, ...match]);
    } catch (err) {
        console.error(err);
      }
  };

  return (
    <RecipeContainer>
      {sessionResults
      ? sessionResults.map( recipe => <RecipeCard 
        key={recipe.id}
        id={recipe.id}
        title={recipe.title} 
        image={recipe.image}
        save={submitSaveHandler}
        steps={recipe.analyzedInstructions[0].steps}
        ready={recipe.readyInMinutes}
        ingredients={recipe.extendedIngredients} />)
      : <li className={classes.emptyList}>results are empty</li>
      }
    </RecipeContainer>
  )

};

export default Results;