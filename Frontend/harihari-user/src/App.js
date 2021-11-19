import React, { lazy, Suspense } from "react";

// import React from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./lazyloading/Loading";
import pMinDelay from "p-min-delay";

const Landing = lazy(() => pMinDelay(import("./components/Landing"), 700));
const Home = lazy(() => pMinDelay(import("./components/Home"), 700));
const Menu = lazy(() => pMinDelay(import("./components/Menu"), 700));
const Invalid = lazy(() => pMinDelay(import("./components/Invalid"), 700));
const History = lazy(() => pMinDelay(import("./components/History"), 700));
const CheckOut = lazy(() => pMinDelay(import("./components/CheckOut"), 700));
const Bill = lazy(() => pMinDelay(import("./components/Bill"), 700));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Switch>
          {/* <Route exact path="/">
            <Home />
          </Route> */}
          <Route path="/:lgs/home/:id">
            <Home />
          </Route>
          <Route path="/:lgs/table/:id">
            <Landing />
          </Route>
          <Route path="/:lgs/menu/:id">
            <Menu />
          </Route>
          <Route path="/:lgs/history/:id">
            <History />
          </Route>
          <Route path="/:lgs/checkout/:id">
            <CheckOut />
          </Route>
          <Route path="/:lgs/bill/:id">
            <Bill />
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
