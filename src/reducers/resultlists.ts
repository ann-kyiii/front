import { reducerWithInitialState } from "typescript-fsa-reducers";
import fetchBookLists, { BooksStateInfo } from "../actions/resultlists";

const initialState: BooksStateInfo = {
  statusCode: 200,
  isLoading: false,
  successedPageIndex: [],
  booksTable: {},
  booksIdList: [],
  maxBooks: 0
};

export const resultListsReducer = reducerWithInitialState(initialState)
  .case(fetchBookLists.started, state => ({
    ...state,
    isLoading: true
  }))
  .case(fetchBookLists.done, (state, payload) => ({
    ...state,
    statusCode: 200,
    isLoading: false,
    booksTable: {
      // ...state.booksTable,
      ...payload.result.booksTable
    },
    // 重複排除
    // booksIdList: Array.from(new Set([...state.booksIdList, ...payload.result.booksIdList])),
    booksIdList: [...payload.result.booksIdList],
    successedPageIndex: [
      ...state.successedPageIndex!,
      payload.params.pageIndex
    ],
    maxBooks: payload.result.maxBooks
  }))
  .case(fetchBookLists.failed, (state, payload) => ({
    ...state,
    statusCode: payload.error.statusCode,
    isLoading: false
  }));

export default resultListsReducer;
