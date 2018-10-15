import React from 'react';
import classes from './Input.css';

export default (props) => {
    let input = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate) inputClasses.push(classes.Invalid);

    switch (props.elementType) {
        case 'input':
            input = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
            break;

        case 'textarea':
            input = <textarea onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value} />
            break;
        
        case 'select': {
            input = <select onChange={props.changed} className={classes.InputElement} value={props.value} > {props.elementConfig.options.map(el => (<option value={el.value} key={el.value}>{el.displayValue}</option>))} </select>
            break;
        }
    
        default:
            input = <input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value}  />
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label} >{props.label}</label>
            {input}
        </div>
    )
};
