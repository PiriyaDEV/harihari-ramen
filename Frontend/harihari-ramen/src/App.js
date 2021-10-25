import React, { lazy, Suspense } from "react";

// import React from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./lazyloading/Loading";
import "./css/App.css";
import pMinDelay from 'p-min-delay';

// import TableQR from "./components/TableQR";
// import Landing from "./components/Landing";
// import Home from "./components/Home";
// import Invalid from "./components/Invalid";

const TableQR = lazy(() => pMinDelay(import('./components/TableQR'), 1000));
const Landing = lazy(() => pMinDelay(import('./components/Landing'), 1000));
const Home = lazy(() => pMinDelay(import('./components/Home'), 1000));
const Invalid = lazy(() => pMinDelay(import('./components/Invalid'), 1000));


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