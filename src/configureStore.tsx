import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers";

export const history = createBrowserHistory();

const configureStore = (preloadedState?: any) => {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancer(applyMiddleware(routerMiddleware(history)))
  );
  return store;
};

export default configureStore;
