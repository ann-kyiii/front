import { combineReducers } from "redux";
import { History } from "history";
import { RouterState, connectRouter } from "connected-react-router";

import tagSelectorReducer from "./tagselector";
import { KeywordTags } from "../actions/tagselector";

export interface RootState {
  router: RouterState;
  tagSelector: KeywordTags;
}

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    tagSelector: tagSelectorReducer
  });

export default rootReducer;
