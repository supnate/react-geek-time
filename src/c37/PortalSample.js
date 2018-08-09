import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import "./PortalSample.css";

export default class PortalSample extends React.PureComponent {
  state = { visible: false };
  renderButton() {
    return (
      <Button type="primary" onClick={() => this.setState({ visible: true })}>
        打开对话框
      </Button>
    );
  }
  renderDialog() {
    return (
      <div className="portal-sample">
        <div>这是一个对话框！</div>
        <br />
        <Button
          type="primary"
          onClick={() => this.setState({ visible: false })}
        >
          关闭对话框
        </Button>
      </div>
    );
  }
  render() {
    if (!this.state.visible) return this.renderButton();
    return ReactDOM.createPortal(
      this.renderDialog(),
      document.getElementById("dialog-container"),
    );
  }
}
