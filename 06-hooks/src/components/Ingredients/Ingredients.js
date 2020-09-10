import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

function Ingredients() {
  const [ingredientProp, setIngredient] = useState([]);
  const [isLoadingProp, setLoading] = useState(false);
  const [hasErrorProp, setHasError] = useState(null);

  // wrap with useCallback to avoid handler being stuck in infinite loop
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
    setLoading(true);

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
      })
      .catch((err) => {
        setHasError(err.message);
      });
  };

  const removeIngredienthandler = (id) => {
    setLoading(true);
    fetch(`https://my-portfolio-c4789.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE",
    }).then(() => {
      setIngredient((prev) => {
        return prev.filter((i) => i.id !== id);
      });
      setLoading(false);
    });
  };

  const clearErrorHandler = () => {
    setHasError(null);
    setLoading(false);
  };

  return (
    <div className="App">
      {hasErrorProp && (
        <ErrorModal onClose={clearErrorHandler}>{hasErrorProp}</ErrorModal>
      )}
      <IngredientForm onAdd={addIngredientHandler} loading={isLoadingProp} />

      <section>
        <Search onLoadIngredients={loadIngredientsHandler} />
        <IngredientList
          ingredients={ingredientProp}
          onRemoveItem={removeIngredienthandler}
        ></IngredientList>
      </section>
    </div>
  );
}

export default Ingredients;
