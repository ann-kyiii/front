import { combineReducers } from "redux";
import { History } from "history";
import { RouterState, connectRouter } from "connected-react-router";

import tagSelectorReducer from "./tagselector";
import resultListsReducer from "./resultlists";

import { KeywordTags } from "../actions/tagselector";
import { BooksState } from "../actions/resultlists";

export interface RootState {
  router: RouterState;
  tagSelector: KeywordTags;
  books: BooksState;
}

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    tagSelector: tagSelectorReducer,
    books: resultListsReducer
  });

export default rootReducer;
