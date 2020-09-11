import React, { useEffect, useCallback, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

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

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
      };

    case "RESPONSE":
      return {
        ...httpState,
        loading: false,
      };

    case "ERROR":
      return {
        loading: false,
        error: action.error,
      };

    case "CLEAR":
      return {
        ...httpState,
        error: null,
      };

    default:
      throw new Error("WHOOPS");
  }
};

function Ingredients() {
  const [ingredientProp, dispatch] = useReducer(ingredientReducer, []);
  // const [ingredientProp, setIngredient] = useState([]);

  const [uiProp, dispatchUi] = useReducer(httpReducer, []);
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

  const addIngredientHandler = (ingredient) => {
    dispatchUi({ type: "SEND" });

    // post data to firebase
    fetch("https://my-portfolio-c4789.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatchUi({ type: "RESPONSE" });
        dispatch({ type: "ADD", ingredient: { id: data.name, ...ingredient } });
      })
      .catch((err) => {
        dispatchUi({ action: "ERROR", error: err.message });
      });
  };

  const removeIngredienthandler = (id) => {
    dispatchUi({ type: "SEND" });
    fetch(`https://my-portfolio-c4789.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE",
    }).then(() => {
      dispatchUi({ type: "RESPONSE" });
      dispatch({ type: "DELETE", id });
    });
  };

  const clearErrorHandler = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <div className="App">
      {uiProp.error && (
        <ErrorModal onClose={clearErrorHandler}>{uiProp.error}</ErrorModal>
      )}
      <IngredientForm onAdd={addIngredientHandler} loading={uiProp.loading} />

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
