import React from "react";
import { Button } from "antd";
import "./Layout2.css";

export default class Layout2 extends React.PureComponent {
  render() {
    return (
      <div className="app-layout2">
        <div className="header">Header</div>
        <div className="sider">Sider</div>
        <div className="content">Content</div>
        <div className="footer">Footer</div>
      </div>
    );
  }
}
