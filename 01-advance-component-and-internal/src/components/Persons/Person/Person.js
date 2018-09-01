import React, { Component } from 'react';
import classes from './Person.css';


export default class Persons extends Component {
    constructor(props) {
        super(props);
        console.log('[Persons.js] inside constructor')
    }

    /**
     * Creational Lifecycle Hooks
     */
    componentWillMount() {
        console.log('[Persons.js] inside componentWillMount')
    }

    componentDidMount() {
        console.log('[Persons.js] inside componentDidMount')
    }

    componentWillUnmount() {
        // Component is about to get removed => Perform any cleanup work here!
        console.log('Im about to be removed!');
    }
    /** */

    render(){
        console.log('[Person.js] inside render')
        return (
            <div className={classes.Person}>
                <p onClick={this.props.click}>Im {this.props.name} and im {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}></input>
            </div>
        );
    }
}