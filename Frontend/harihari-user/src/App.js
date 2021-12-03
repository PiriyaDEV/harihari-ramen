//Import
import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "./lazyloading/Loading";
import pMinDelay from "p-min-delay";
import { Redirect } from 'react-router-dom';

const Landing = lazy(() => pMinDelay(import("./components/Landing"), 700));     // declaired a landing page with the delay 700 ms.
const Home = lazy(() => pMinDelay(import("./components/Home"), 700));           // declaired a home page with the delay 700 ms.
const Menu = lazy(() => pMinDelay(import("./components/Menu"), 700));           // declaired a menu page with the delay 700 ms.
const Invalid = lazy(() => pMinDelay(import("./components/Invalid"), 700));     // declaired a invalid page with the delay 700 ms.
const History = lazy(() => pMinDelay(import("./components/History"), 700));     // declaired a history page with the delay 700 ms.
const CheckOut = lazy(() => pMinDelay(import("./components/CheckOut"), 700));   // declaired a checkout page with the delay 700 ms.
const Bill = lazy(() => pMinDelay(import("./components/Bill"), 700));           // declaired a bill page with the delay 700 ms.
const HariMain = lazy(() => pMinDelay(import("./components/HariMain"), 700));   // declaired a main page with the delay 700 ms.

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Switch>
          <Route exact path="/">
            <HariMain />
          </Route>
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
          <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
