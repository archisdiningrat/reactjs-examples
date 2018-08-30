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

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 20 },
        { name: 'atikha', age: 23 }
      ]
    });
  }

  nameChangedHandler = ({ target: { value: newName }}) => {
    this.setState({
      persons: [
        { name: newName, age: 20 },
        { name: 'atikha', age: 23 }
      ]
    });
  }

  render() {
    // inline style
    const style = {
      'background-color': 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hi, im a react app.</h1>
        <button style={style} onClick={() => this.switchNameHandler('acha')}>switch name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} click={() => this.switchNameHandler('angga') } changed={this.nameChangedHandler}>Hola Amigos</Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'ijul')} >Hello Friends</Person>
      </div>
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Im react app'))
  }
}

export default App;
