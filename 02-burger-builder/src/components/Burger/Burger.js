import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import classes from './Burger.css';

export default (props) => {
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top"></Ingredient>
            <Ingredient type="cheese"></Ingredient>
            <Ingredient type="bacon"></Ingredient>
            <Ingredient type="meat"></Ingredient>
            <Ingredient type="salad"></Ingredient>
            <Ingredient type="bread-bottom"></Ingredient>
        </div>
    );
}