import { reducerWithInitialState } from "typescript-fsa-reducers";
import fetchBookLists, { SavedBooks } from "../actions/resultlists";

const initialState: SavedBooks = { statusCode: 200, isLoading: false };

export const resultListsReducer = reducerWithInitialState(initialState)
  .case(fetchBookLists.started, state => ({
    ...state,
    isLoading: true
  }))
  .case(fetchBookLists.done, (state, payload) => ({
    ...state,
    ...payload.result,
    statusCode: 200,
    isLoading: false
  }))
  .case(fetchBookLists.failed, (state, payload) => ({
    ...state,
    ...payload.error,
    isLoading: false
  }));

export default resultListsReducer;
