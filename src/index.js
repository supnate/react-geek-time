import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import ChatApp from "./c1/ChatApp";
import CommentBox from "./c2/CommentBox";
import { TabSelectorSample } from "./c2/TabSelector";
import { StatefulTabSelectSample } from "./c2/StatefulTabSelector";
import Clock from "./c3/Clock";
import SnapshotSample from "./c4/SnapshotSample";
import DomDiff from "./c5/DomDiff";
import { AdvancedTabSelectorSample } from "./c6/AdvancedTabSelector";
import LocaleSample from "./c7/LocaleSample";
import PureRedux from "./c11/PureRedux";
import Counter from "./c12/Counter";
import AsyncAction from "./c13/AsyncAction";
import ReduxMiddleware from "./c13/ReduxMiddleware";
import OrgActions from "./c14/OrgActions";
import RouterSample from "./c16/RouterSample";
import RouterParams from "./c17/RouterParams";
import NestedRoute from "./c17/NestedRoute";
import "./index.css";

const styles = {
  fontFamily: "sans-serif",
  paddingLeft: "250px"
};

const routeMap = {
  chat: ChatApp,
  "comment-box": CommentBox,
  "tab-selector": TabSelectorSample,
  "stateful-tab-selector": StatefulTabSelectSample,
  "snapshot-sample": SnapshotSample,
  "dom-diff": DomDiff,
  "adv-tab-selector": AdvancedTabSelectorSample,
  "locale-sample": LocaleSample,
  clock: Clock,
  "pure-redux": PureRedux,
  counter: Counter,
  "async-action": AsyncAction,
  "redux-middleware": ReduxMiddleware,
  "org-actions": OrgActions,
  "router-sample": RouterSample,
  "router-params": RouterParams,
  "nested-route": NestedRoute
};

class App extends React.PureComponent {
  handleLinkClick = key => {
    // window.location.hash = `#${key}`;
    window.history.pushState(null, "", `/#${key}`);
    this.forceUpdate();
  };
  render() {
    const currentPage = document.location.hash.replace(
      "#",
      ""
    );

    const CurrentPage = routeMap[currentPage] || Hello;
    return (
      <div style={styles}>
        <ul className="menu-list">
          {Object.keys(routeMap).map(key => (
            <li
              key={key}
              className={
                key ===
                document.location.hash.replace("#", "")
                  ? "is-active"
                  : ""
              }
              style={{ listStyle: "none" }}
            >
              <span
                className="link"
                onClick={() => this.handleLinkClick(key)}
              >
                {key}
              </span>
            </li>
          ))}
        </ul>
        <div style={{ padding: "30px 0" }}>
          <CurrentPage />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
