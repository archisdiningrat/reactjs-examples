import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons:[
      { id: 1, name: 'atikha', age: 23 },
      { id: 2, name: 'archie', age: 22 }
    ],
    showPersons: true
  }

  nameChangedHandler = ({ target: { value: newName }}, id) => {
    const index = this.state.persons.findIndex(person => person.id === id);

    /** avoiding copy by reference */
    const person = {
      ...this.state.persons[index],
    }
    person.name = newName;

    const persons = [...this.state.persons];
    persons[index] = person;

    this.setState({ persons });
  }

  togglePersonHandler = () => {
    const show = this.state.showPersons;
    this.setState({ showPersons: !show });
  }

  deletePersonHandler = (index) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons });
  }

  render() {

    let persons = null;
    if (this.state.showPersons){
      persons = <Persons 
                  persons={this.state.persons} 
                  clicked={this.deletePersonHandler} 
                  changed={this.nameChangedHandler} />
    }

    return (
      <div className={classes.App}>
          <Cockpit
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            toggle={this.togglePersonHandler}
          />
          {persons}
        </div>
    );
  }
}

export default App;
