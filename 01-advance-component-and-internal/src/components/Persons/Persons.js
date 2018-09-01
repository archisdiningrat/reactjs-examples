import React, { Component } from 'react';
import Person from './Person/Person';

export default class Persons extends Component {
    constructor(props) {
        super(props);
        console.log('[Persons.js] inside constructor')
    }

    componentWillMount() {
        console.log('[Persons.js] inside componentWillMount')
    }

    componentDidMount() {
        console.log('[Persons.js] inside componentDidMount')
    }

    /**
     * Update Lifecyle Hooks
     */
    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Persons.js] componentWillReceiveProps]')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] shouldComponentUpdate]')
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] componentWillUpdate]')
    }

    componentDidUpdate() {
        console.log('[UPDATE Persons.js] componentDidUpdate]')
    }
    /** */

    render(){
        console.log('[Persons.js] inside render')
        return (
            this.props.persons.map((person, index) => (
                <Person
                    name={person.name}
                    age={person.age}
                    click={() => this.props.clicked(index)}
                    changed={(event) => this.props.changed(event, person.id)}
                    key={person.id}
                />
            ))
        )
    }
}
