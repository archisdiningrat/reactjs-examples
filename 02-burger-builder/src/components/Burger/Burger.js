import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import classes from './Burger.css';

export default (props) => {
    let ingredients = Object.keys(props.ingredients)
    .map((item) => {
        return [...Array(props.ingredients[item])]
            .map((_item, i) => <Ingredient key={`${item}${i}`} type={item} />)
    })
    .reduce((res, item) => {
        return res.concat(item);
    }, []);

    if (ingredients.length === 0) ingredients = <p>Please add ingredients</p>
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"></Ingredient>
                {ingredients}
            <Ingredient type="bread-bottom"></Ingredient>
        </div>
    );
}