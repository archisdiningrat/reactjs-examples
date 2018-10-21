import { INCREMENT, DECREMENT, ADD, REMOVE } from './type';

// ACTIONS CREATORS FOR ASYNC CODE AND BETTER STRUCTURE
export const increment = () => {
    return {
        type: INCREMENT
    }
};

export const decrement = () => {
    return {
        type: DECREMENT
    }
};

export const add = (value) => {
    return {
        type: ADD,
        value
    }
};

export const remove = (value) => {
    return {
        type: REMOVE,
        value
    }
};