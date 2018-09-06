import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

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
                        <span style={style}>{key}: {props.ingredients[key]}</span>
                    </li>
                ))}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout ?</p>
            <Button type='Danger' clicked={props.purchaseCancelled} >CANCEL</Button>
            <Button type='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </Fragment>
    );
}