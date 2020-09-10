import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredientProp, setIngredient] = useState([]);

  const addIngredientHandler = (ingredient) => {
    setIngredient((prev) => {
      return [...prev, { id: Math.random().toString(), ...ingredient }];
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
