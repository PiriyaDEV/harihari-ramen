import React from "react";

// import React from "react";
import { Route, Switch } from "react-router-dom";

import Payment from "./components/Payment";
import Receipt from "./components/Receipt";
import Mainpage from "./components/Mainpage";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
            <Mainpage />
          </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/receipt">
          <Receipt />
        </Route>
        {/* <Route path="/:id">
          <p>ไม่มี pathนี้</p>
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
