import React from 'react';
import classes from './Cockpit.css'
import Aux from '../../hoc/Aux';

export default (props) => {
    let assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) btnClass = classes.Red;
    if (props.persons.length <= 2) assignedClasses.push(classes.red);
    if (props.persons.length <= 1) assignedClasses.push(classes.bold);

    return (
        /**
         * HIGH ORDER COMPONENT
         */
        <Aux>
            <div className={classes.Cockpit}>
                <h1>Hi, im a react app.</h1>
                <p className={assignedClasses.join(' ')}>this is really working</p>
                <button onClick={props.toggle} className={btnClass}>show / hide</button>
            </div>
            <button onClick={props.login}>Login</button>
        </Aux>
    )
};