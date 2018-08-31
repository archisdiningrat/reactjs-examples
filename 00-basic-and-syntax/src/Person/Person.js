import React from 'react';
import './Person.css';
// import Radium from 'radium';

// Stateless Component
const person = (props) => {
    // const style = {
    //     '@media (min-width: 500 px)': {
    //         width: '450px'
    //     } 
    // }
    return (
        <div className="Person">
            <p onClick={props.click}>Im {props.name} and im {props.age} years old</p>
            <p>{ props.children }</p>
            <input type="text" onChange={props.changed} value={props.name}></input>
        </div>
    );
}

export default person;