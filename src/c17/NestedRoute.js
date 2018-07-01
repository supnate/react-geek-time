import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const Category = ({ match }) => (
  <h1>Sub Category {match.params.subId}</h1>
);

const SubCategory = ({ match }) => (
  <div>
    <h1>Category {match.params.id}</h1>

    <ul id="menu">
      <li>
        <Link to={`/category/${match.params.id}/sub/1`}>
          Sub Category 1
        </Link>
      </li>
      <li>
        <Link to={`/category/${match.params.id}/sub/2`}>
          Sub Category 2
        </Link>
      </li>
      <li>
        <Link to={`/category/${match.params.id}/sub/3`}>
          Sub Category 3
        </Link>
      </li>
    </ul>
    <div id="page-container-2">
      <Route
        path="/category/:id/sub/:subId"
        component={Category}
      />
    </div>
  </div>
);

export default class NestedRoute extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <ul id="menu">
            <li>
              <Link to="/category/1">Category 1</Link>
            </li>
            <li>
              <Link to="/category/2">Category 2</Link>
            </li>
            <li>
              <Link to="/category/3">Category 3</Link>
            </li>
          </ul>

          <div id="page-container">
            <Route
              path="/category/:id"
              component={SubCategory}
            />
          </div>
        </div>
      </Router>
    );
  }
}
