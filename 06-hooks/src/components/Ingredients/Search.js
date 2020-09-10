import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [searchProp, setSearch] = useState("");

  useEffect(() => {
    const query = searchProp.length
      ? `?orderBy="title"&equalTo="${searchProp}"`
      : "";

    fetch("https://my-portfolio-c4789.firebaseio.com/ingredients.json" + query)
      .then((reponse) => reponse.json())
      .then((data) => {
        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            ...data[key],
          });
        }
        onLoadIngredients(loadedIngredients);
      });
  }, [onLoadIngredients, searchProp]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={searchProp}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
