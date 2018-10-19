import ACT from "../actions";

const initState = {
    counter: 0
}


export default (state = initState, action) => {

    switch (action.type) {
        case ACT.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }

        case ACT.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }

        case ACT.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }

        case ACT.REMOVE:
            return {
                ...state,
                counter: state.counter - action.value
            }

        default:
            return state;
    }

}