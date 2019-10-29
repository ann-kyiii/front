/**
 * Settings of using history by connected-router.
 */
import React from "react";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import routes from "./components/pages/routes";

export type AppProps = {
  history: History;
};

const App = ({ history }: AppProps) => (
  <ConnectedRouter history={history}>{routes}</ConnectedRouter>
);

export default App;
