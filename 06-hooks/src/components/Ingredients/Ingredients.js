import React, { useEffect, useCallback, useReducer, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http-hook";

// decoupled from component
const ingredientReducer = (currentIngredient, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;

    case "ADD":
      return [...currentIngredient, action.ingredient];

    case "DELETE":
      return currentIngredient.filter((i) => i.id !== action.id);

    default:
      throw new Error("WHOOPS");
  }
};

function Ingredients() {
  const [ingredientProp, dispatch] = useReducer(ingredientReducer, []);
  // const [ingredientProp, setIngredient] = useState([]);

  // custom hook
  const { loading, error, sendRequest } = useHttp();
  // const [isLoadingProp, setLoading] = useState(false);
  // const [hasErrorProp, setHasError] = useState(null);

  // wrap with useCallback to avoid handler being stuck in infinite loop
  const loadIngredientsHandler = useCallback((ingredients) => {
    dispatch({ type: "SET", ingredients });
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

  // wrapped with useCallback to avoid unnecessary rerender
  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        "https://my-portfolio-c4789.firebaseio.com/ingredients.json",
        "POST",
        JSON.stringify(ingredient)
      );
      dispatch({
        type: "ADD",
        ingredient: { id: Math.random().toString(), ...ingredient },
      });
    },
    [sendRequest]
  );

  const removeIngredienthandler = useCallback(
    (id) => {
      sendRequest(
        `https://my-portfolio-c4789.firebaseio.com/ingredients/${id}.json`,
        "DELETE"
      );
      dispatch({ type: "DELETE", id });
    },
    [sendRequest]
  );

  const clearErrorHandler = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  // to avoid redender when
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredientProp}
        onRemoveItem={removeIngredienthandler}
      ></IngredientList>
    );
  }, [ingredientProp, removeIngredienthandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearErrorHandler}>{error}</ErrorModal>}
      <IngredientForm onAdd={addIngredientHandler} loading={loading} />

      <section>
        <Search onLoadIngredients={loadIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
