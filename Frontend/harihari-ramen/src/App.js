import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./lazyloading/Loading";
import "./css/App.css";


const TableQR = lazy(() => import("./components/TableQR"));
const MainLanding = lazy(() => import("./functions/MainLanding"));
const Home = lazy(() => import("./functions/MainHome"));

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
          <Route path="/home/:id">
            <Home />
          </Route>
          <Route path="/qr">
            <TableQR />
          </Route>
          <Route path="/table/:id">
            <MainLanding />
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
