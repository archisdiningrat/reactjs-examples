import React, { Component } from 'react';
import classes from './Person.css';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../containers/App';

class Person extends Component {
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
        this.inputElement.focus();
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
                <AuthContext.Consumer>
                    {auth => auth ? <p>Logged in</p> : <p>Not Logged in</p>}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>Im {this.props.name} and im {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input 
                    ref={(val) => { this.inputElement = val }}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name}
                />
            </div>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default Person;