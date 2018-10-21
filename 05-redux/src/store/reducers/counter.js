import * as ACT from "../actions/type";
import { updateObject } from "../utility";

const initState = {
    counter: 0
}


export default (state = initState, action) => {

    switch (action.type) {
        case ACT.INCREMENT:
            return updateObject(state, { counter: state.counter + 1  });

        case ACT.ADD:
            return updateObject(state, { counter: state.counter + action.value })

        case ACT.DECREMENT:
            return updateObject(state, { counter: state.counter - 1 })

        case ACT.REMOVE:
            return updateObject(state, { counter: state.counter - action.value })

        default:
            return state;
    }

}