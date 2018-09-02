import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';


/** Global Context */
export const AuthContext = React.createContext(false);
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      persons: [
        { id: 2, name: 'archie', age: 22 },
        { id: 3, name: 'angga', age: 20 },
      ],
      showPersons: false,
      counter: 0,
      authenticated: false
    }
    console.log('[App.js] inside constructor')
  }

  componentWillMount() {
    console.log('[App.js] inside componentWillMount')
  }

  componentDidMount() {
    console.log('[App.js] inside componentDidMount')
  }

  /** Update Lifecyle Hooks */
  shouldComponentUpdate(nextProps, nextState){
    console.log('[UPDATE App.js] inside shouldComponentUpdate')
    return true;
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
    this.setState((prevState, props) => ({ showPersons: !show, counter: prevState.counter + 1 }));
  }

  deletePersonHandler = (index) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons });
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {
    console.log('[App.js] inside render')
    let persons = null;
    if (this.state.showPersons){
      persons = <Persons 
                  persons={this.state.persons} 
                  clicked={this.deletePersonHandler} 
                  changed={this.nameChangedHandler} />
    }

    return (
      /**
       * Wrapped with HOC
       */
      <WithClass classes={classes.App}>
        <button onClick={() => this.setState({ showPersons: true })}>Show Person</button>
          <Cockpit
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            toggle={this.togglePersonHandler}
            login={this.loginHandler}
          />

        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>

      </WithClass>
    );
  }
}

export default App;
