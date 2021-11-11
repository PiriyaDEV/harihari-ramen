import React from "react";

// import React from "react";
import { Route, Switch } from "react-router-dom";

import TableQR from "./components/TableQR";
import Payment from "./components/Payment";
import Receipt from "./components/Receipt";

function App() {
  return (
    <div>
      <Switch>
        {/* <Route exact path="/">
            <Home />
          </Route> */}
        <Route path="/qr">
          <TableQR />
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
