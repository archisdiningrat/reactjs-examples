import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons:[
      { name: 'archie', age: 22 },
      { name: 'atikha', age: 23 }
    ]
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, im a react app.</h1>
        <button>switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}>Hola Amigos</Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>Hello Friends</Person>
      </div>
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Im react app'))
  }
}

export default App;
