import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredientProp, setIngredient] = useState([]);

  const loadIngredientsHandler = useCallback((ingredients) => {
    setIngredient(ingredients);
  }, []);

  // useEffect(() => {
  //   fetch("https://my-portfolio-c4789.firebaseio.com/ingredients.json")
  //     .then((reponse) => reponse.json())
  //     .then((data) => {
  //       const loadedIngredients = [];
  //       for (const key in data) {
  //         loadedIngredients.push({
  //           id: key,
  //           ...data[key],
  //         });
  //       }
  //       setIngredient(loadedIngredients);
  //     });
  // }, []); // no dependency, will act like component did mount

  useEffect(() => {
    console.log("RERENDERING INGREDIENTS", ingredientProp);
  }, [ingredientProp]); // will act like component did update

  const addIngredientHandler = (ingredient) => {
    // post data to firebase
    fetch("https://my-portfolio-c4789.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setIngredient((prev) => {
          return [...prev, { id: data.name, ...ingredient }];
        });
      });
  };

  return (
    <div className="App">
      <IngredientForm onAdd={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={loadIngredientsHandler} />
        <IngredientList
          ingredients={ingredientProp}
          onRemoveItem={() => {}}
        ></IngredientList>
      </section>
    </div>
  );
}

export default Ingredients;
