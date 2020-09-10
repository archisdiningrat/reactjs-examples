import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredientProp, setIngredient] = useState([]);

  // run every render cycle
  useEffect(() => {
    fetch("https://my-portfolio-c4789.firebaseio.com/ingredients.json")
      .then((reponse) => reponse.json())
      .then((data) => {
        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            ...data[key],
          });
        }
        setIngredient(loadedIngredients);
      });
  }, []); // no dependency, will act like component did mount

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
        <Search />
        <IngredientList
          ingredients={ingredientProp}
          onRemoveItem={() => {}}
        ></IngredientList>
      </section>
    </div>
  );
}

export default Ingredients;
