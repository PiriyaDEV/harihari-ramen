import React from "react";

// import React from "react";
import { Route, Switch } from "react-router-dom";

import Mainpage from "./components/Mainpage";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Mainpage />
        </Route>
        {/* <Route path="/:id">
          <p>ไม่มี pathนี้</p>
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
