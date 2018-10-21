import { increment, decrement, add, remove, store_result, delete_result } from "../actions";

export default (dispatch) => ({
    onIncrementCounter: () => dispatch(increment()),
    onAddCounter: () => dispatch(add(5)),
    onDecrementCounter: () => dispatch(decrement()),
    onRemoveCounter: () => dispatch(remove(5)),
    onStore: (counter) => dispatch(store_result(counter)),
    onDelete: (id) => dispatch(delete_result(id))
})