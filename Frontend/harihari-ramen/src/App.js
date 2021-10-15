import React, { lazy , Suspense } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Loading from './lazyloading/Loading';
import "./css/App.css";

const TableQR = lazy(() => import('./components/TableQR'));
const OrderMenu = lazy(() => import('./components/OrderMenu'));

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loading/>}>
    <div>
      <nav>
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
        </ul>
      </nav>
      

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/qr">
          <TableQR />
        </Route>
        <Route path="/order/:id">
          <OrderMenu />
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
