import React from 'react';
import './Person.css';

// Stateless Component
const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>Im {props.name} and im {props.age} years old</p>
            <p>{ props.children }</p>
            <input type="text" onChange={props.changed} value={props.name}></input>
        </div>
    );
}

export default person;