import { createReducer, EmptyActionCreator } from "redux-act";
import { createAction } from "redux-act";

const defaultState: number = 0;

export const increment = createAction("Increment");
export const decrement = createAction("Decrement");

export default createReducer({
    [increment.getType()]: (state) => state + 1,
    [decrement.getType()]: (state) => state - 1,
}, defaultState);
