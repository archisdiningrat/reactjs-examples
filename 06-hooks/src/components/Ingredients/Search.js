import React, { useEffect, useState, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [searchProp, setSearch] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    // act as deboucer
    const timer = setTimeout(() => {
      if (searchProp === searchRef.current.value) {
        const query = searchProp.length
          ? `?orderBy="title"&equalTo="${searchProp}"`
          : "";

        fetch(
          "https://my-portfolio-c4789.firebaseio.com/ingredients.json" + query
        )
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
      }
    }, 500);

    // remove overlapping timer
    return () => {
      clearTimeout(timer);
    };
  }, [onLoadIngredients, searchProp, searchRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={searchRef}
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
