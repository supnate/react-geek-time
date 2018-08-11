import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import ChatApp from "./c01/ChatApp";
import CommentBox from "./c02/CommentBox";
import { TabSelectorSample } from "./c02/TabSelector";
import { StatefulTabSelectSample } from "./c02/StatefulTabSelector";
import Clock from "./c03/Clock";
import SnapshotSample from "./c04/SnapshotSample";
import DomDiff from "./c05/DomDiff";
import { AdvancedTabSelectorSample } from "./c06/AdvancedTabSelector";
import LocaleSample from "./c07/LocaleSample";
import PureRedux from "./c11/PureRedux";
import Counter from "./c12/Counter";
import AsyncAction from "./c13/AsyncAction";
import ReduxMiddleware from "./c13/ReduxMiddleware";
import OrgActions from "./c14/OrgActions";
import RouterSample from "./c16/RouterSample";
import RouterParams from "./c17/RouterParams";
import NestedRoute from "./c17/NestedRoute";
import FormSubmit from "./c29/FormSubmit";
import FormSubmitAntd from "./c29/FormSubmitAntd";
import DynamicForm from "./c30/DynamicForm";
import ListSample from "./c31/App";
import MultipleRequest from "./c33/MultipleRequest";
import WizardSample from "./c35/App";
import Layout1 from "./c36/Layout1";
import Layout2 from "./c36/Layout2";
import LayoutResize from "./c36/LayoutResize";
import PortalSample from "./c37/PortalSample";
import AntdDialog from "./c37/AntdDialog";
// import D3Sample from "./c38/D3Sample";
import DndSample from "./c40/DndSample";
import ReselectSample from "./c43/ReselectSample";
import Suspense from "./c44/Suspense";
import "antd/dist/antd.css";
import "./index.css";

import loadable from "react-loadable";
const D3Sample = loadable({
  loader: () => import("./c38/D3Sample"),
  loading: () => <div>Loading...</div>,
});

const styles = {
  fontFamily: "sans-serif",
  paddingLeft: "250px",
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
  "nested-route": NestedRoute,
  "form-submit": FormSubmit,
  "form-submit-antd": FormSubmitAntd,
  "dynamic-form": DynamicForm,
  "list-page": ListSample,
  "multiple-request": MultipleRequest,
  "wizard-sample": WizardSample,
  layout1: Layout1,
  layout2: Layout2,
  "layout-resize": LayoutResize,
  "portal-sample": PortalSample,
  "antd-dialog": AntdDialog,
  "d3-sample": D3Sample,
  "dnd-sample": DndSample,
  "reselect-sample": ReselectSample,
  suspense: Suspense,
};

class App extends React.PureComponent {
  handleLinkClick = key => {
    // window.location.hash = `#${key}`;
    window.history.pushState(null, "", `/#/${key}`);
    this.forceUpdate();
  };
  render() {
    const currentPage = document.location.hash.replace(/#\/?/, "");

    let CurrentPage = routeMap[currentPage] || Hello;
    if (currentPage.match(/user\/\w+|list-page/)) {
      CurrentPage = ListSample;
    }
    if (currentPage.match(/wizard\/step\/\w+/)) {
      CurrentPage = WizardSample;
    }
    return (
      <div style={styles}>
        <ul className="menu-list">
          {Object.keys(routeMap).map(key => (
            <li
              key={key}
              className={key === currentPage ? "is-active" : ""}
              style={{ listStyle: "none" }}
            >
              <span className="link" onClick={() => this.handleLinkClick(key)}>
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
