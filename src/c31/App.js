import React from "react";
import axios from "axios";
import { bindActionCreators, createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Pagination, Table, Input } from "antd";
import ListPage from "./ListPage";
import DetailPage from "./DetailPage";
import reducer from "./reducer";

require("./App.css");
const createLogger = require("redux-logger").createLogger;
const logger = createLogger({ collapsed: true });

// Create store
const store = createStore(reducer, {}, applyMiddleware(thunk, logger));

export default class ListPageSample extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="list-page-app">
            <Route path="/list-page/:page?" component={ListPage} />
            <Route path="/user/:userId" component={DetailPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}
