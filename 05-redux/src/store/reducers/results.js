import * as  ACT from "../actions/type";
import { updateObject } from "../utility";

const initState = {
    results: []
}

export default (state = initState, action) => {

    switch (action.type) {

        case ACT.STORE_RESULT:
            return updateObject(state, { results: state.results.concat({ id: new Date(), value: action.counter }) });

        case ACT.DELETE_RESULT: {
            const newArray = state.results.filter(item => item.id !== action.id);
            return updateObject(state, { results: newArray });
        }
        
        default:
            return state;
    }

}
