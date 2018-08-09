import React from "react";
import { Button } from "antd";
import "./LayoutResize.css";

export default class LayoutResize extends React.PureComponent {
  state = {
    dragging: false,
    startPageX: 0,
    siderWidth: 150,
  };

  handleMouseDown = evt => {
    this.setState({
      dragging: true,
      startPageX: evt.pageX,
    });
  };
  handleMouseUp = () => {
    this.setState({
      dragging: false,
    });
  };
  handleMouseMove = evt => {
    let siderWidth = this.state.siderWidth + evt.pageX - this.state.startPageX;
    if (siderWidth < 20 || siderWidth > 300) return;
    this.setState({
      siderWidth,
      startPageX: evt.pageX,
    });
  };
  render() {
    const { dragging, siderWidth } = this.state;
    const pxWidth = `${siderWidth}px`;
    return (
      <div className="app-layout-resize" style={{ paddingLeft: pxWidth }}>
        <div className="header">Header</div>
        <div className="sider" style={{ width: pxWidth }}>
          Sider
        </div>
        <div className="content" style={{ left: pxWidth }}>
          Content
        </div>
        <div className="footer" style={{ left: pxWidth }}>
          Footer
        </div>
        <div
          className="sider-resizer"
          style={{ left: pxWidth }}
          onMouseDown={this.handleMouseDown}
        />
        {dragging && (
          <div
            className="resize-mask"
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
          />
        )}
      </div>
    );
  }
}
