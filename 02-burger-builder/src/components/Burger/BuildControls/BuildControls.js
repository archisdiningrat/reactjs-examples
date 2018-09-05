import React from 'react';
import classes from './BuildControls.css'
import Control from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

export default (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price}</strong></p>
            {controls.map(control => (
                <Control 
                    label={control.label} 
                    key={control.label} 
                    more={() => props.add(control.type)} 
                    less={() => props.remove(control.type)}
                    disabled={props.disabled[control.type]}
                />
            ))}
            <button className={classes.OrderButton} disabled={!props.purchaseable}>ORDER</button>
        </div>
    )
}