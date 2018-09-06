import React from 'react';
import classes from './Button.css';

export default (props) => {
    return (
        <button onClick={props.clicked} className={[classes.Button, classes[props.type]].join(' ')}>
            {props.children}
        </button>
    )
}