import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./lazyloading/Loading";
import "./css/App.css";

const TableQR = lazy(() => import("./components/TableQR"));
const Landing = lazy(() => import("./components/Landing"));
const Home = lazy(() => import("./components/Home"));
const Invalid = lazy(() => import("./components/Invalid"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/qr">TableQR</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <Link to="/table">Landing</Link>
            </li>
          </ul>
        </nav> */}

        <Switch>
          {/* <Route exact path="/">
            <Home />
          </Route> */}
          <Route path="/:lgs/home/:id">
            <Home />
          </Route>
          <Route path="/qr">
            <TableQR />
          </Route>
          <Route path="/:lgs/table/:id">
            <Landing />
          </Route>
          <Route path="/invalid">
            <Invalid />
          </Route>
          {/* <Route path="/:id">
          <p>ไม่มี pathนี้</p>
        </Route> */}
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
