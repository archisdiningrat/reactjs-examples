import React, { Component } from 'react';
import { connect } from "react-redux";
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import action from "../../store/actions";

class Counter extends Component {
    state = {
        counter: 0
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onRemoveCounter}  />
                <hr></hr>
                <button onClick={() => this.props.onStore(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.results.map(item => (
                        <li key={item.id} onClick={() => this.props.onDelete(item.id)}>{item.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ctr: state.ctr.counter,
    results: state.res.results
});

const mapDispatchToProps = dispatch => ({
    onIncrementCounter: () => dispatch({ type: action.INCREMENT }),
    onAddCounter: () => dispatch({ type: action.ADD, value: 5 }),
    onDecrementCounter: () => dispatch({ type: action.DECREMENT }),
    onRemoveCounter: () => dispatch({ type: action.REMOVE, value: 5 }),
    onStore: (counter) => dispatch({ type: action.STORE_RESULT, counter }),
    onDelete: (id) => dispatch({ type: action.DELETE_RESULT, id })
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
