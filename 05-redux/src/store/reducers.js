const initState = {
    counter: 0
}


export default (state = initState, action) => {
    if (action.type === 'INCREMENT') {
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if (action.type === 'ADD') {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    if (action.type === 'DECREMENT') {
        return {
            ...state,
            counter: state.counter - 1
        }
    }
    if (action.type === 'REMOVE') {
        return {
            ...state,
            counter: state.counter - action.value
        }
    }
    return state;
}