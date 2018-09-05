import React, { Fragment } from 'react';

export default (props) => {
    const ingredients = Object.keys(props.ingredients);
    const style = { textTransform: 'capitalize' };
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Ingredients Added:</p>
            <ul>
                {ingredients.map((key) => (
                    <li key={key}>
                        <span style={style}>{key}:{props.ingredients[key]}</span>
                    </li>
                ))}
            </ul>
            <p>Continue to checkout ?</p>
        </Fragment>
    );
}