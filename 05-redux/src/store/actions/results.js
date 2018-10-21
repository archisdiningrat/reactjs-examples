import { STORE_RESULT, DELETE_RESULT } from './type';

// ASYNC CODE
const saveResult = (counter) => {
    return {
        type: STORE_RESULT,
        counter
    }
}

export const store_result = (counter) => {
    return (dispatch, getState) => {
        // simulate async
        setTimeout(() => {
            const oldCounter = getState().ctr.counter;
            console.log(oldCounter);
            dispatch(saveResult(counter));
        }, 2000);
    }
};
// ---

export const delete_result = (id) => {
    return {
        type: DELETE_RESULT,
        id
    }
};
