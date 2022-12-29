import { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

const Home = lazy(() => import("../templates/Home"));
const BookLists = lazy(() => import("../templates/BookLists"));
const BookDetail = lazy(() => import("../templates/BookDetail"));
const Borrow = lazy(() => import("../templates/Borrow"));
const Return = lazy(() => import("../templates/Return"));
const Review = lazy(() => import("../templates/Review"));
const Camera = lazy(() => import("../templates/Camera"));
const NotFound = lazy(() => import("../templates/NotFound"));

const routes = (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/book-lists" component={BookLists} />
      <Route path="/book-detail" component={BookDetail} />
      <Route path="/borrow" component={Borrow} />
      <Route path="/return" component={Return} />
      <Route path="/review" component={Review} />
      <Route path="/camera" component={Camera} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default routes;
