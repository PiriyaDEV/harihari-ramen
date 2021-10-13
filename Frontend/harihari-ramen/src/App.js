import "./css/App.css";
import { Link, Route, Switch } from "react-router-dom";
import TableQR from "./components/TableQR";

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/TableQR">TableQR</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/TableQR">
          <TableQR />
        </Route>
        <Route path="/:id">
          <p>ไม่มี pathนี้</p>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
