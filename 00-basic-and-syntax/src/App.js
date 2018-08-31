import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
// import Radium, { StyleRoot } from 'radium';

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
    // inline style
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid',
      padding: '8px',
      cursor: 'pointer'
    }

    /** render conditionally JS ways */
    let persons = null;
    if (this.state.showPersons){
      /** render list */
      persons = (
        <div>
          {this.state.persons.map((person, index) => (
            <Person name={person.name} age={person.age} click={() => this.deletePersonHandler(index)} changed={(event) => this.nameChangedHandler(event, person.id)} key={person.id}></Person>
          ))}
        </div> 
      )
      style.backgroundColor = 'red';
    }
    /** */

    let classes = [];
    if (this.state.persons.length <= 2) classes.push('red');
    if (this.state.persons.length <= 1) classes.push('bold');

    return (
        <div className="App">
          <h1>Hi, im a react app.</h1>
          <p className={classes.join(' ')}>this is really working</p>
          <button style={style} onClick={this.togglePersonHandler}>show / hide</button>
          {persons}
        </div>
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Im react app'))
  }
}

export default App;
