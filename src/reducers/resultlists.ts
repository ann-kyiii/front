import { reducerWithInitialState } from "typescript-fsa-reducers";
import fetchBookLists, { SavedBooks } from "../actions/resultlists";

const initialState: SavedBooks = {};

export const resultListsReducer = reducerWithInitialState(initialState)
  .case(fetchBookLists.started, state => state)
  .case(fetchBookLists.done, (state, payload) => ({
    ...state,
    ...payload.result
  }))
  .case(fetchBookLists.failed, (state, payload) => ({
    ...state,
    ...payload.error
  }));

export default resultListsReducer;
