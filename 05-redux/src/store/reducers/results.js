import ACT from "../actions";

const initState = {
    results: []
}

export default (state = initState, action) => {

    switch (action.type) {

        case ACT.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({ id: new Date(), value: action.counter })
            }

        case ACT.DELETE_RESULT:
        const newArray = state.results.filter(item => item.id !== action.id);
            return {
                ...state,
                results: newArray
            }
        
        default:
            return state;
    }

}
