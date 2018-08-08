import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal } from "antd";
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
      <Modal
        visible={this.state.visible}
        onCancel={() => this.setState({ visible: false })}
      >
        <div>这是一个对话框！</div>
      </Modal>
    );
  }
  render() {
    return (
      <div>
        {this.renderButton()}
        {this.renderDialog()}
      </div>
    );
  }
}
