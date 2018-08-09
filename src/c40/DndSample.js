import React, { Component } from "react";

require("./DndSample.css");

const list = [];
for (let i = 0; i < 10; i++) {
  list.push(`Item ${i + 1}`);
}

const move = (arr, startIndex, toIndex) => {
  arr = arr.slice();
  arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
  return arr;
};

const lineHeight = 42;
class DndSample extends Component {
  constructor(props) {
    super(props);
    this.state.list = list;
  }
  state = {
    dragging: false,
    draggingIndex: -1,
    startPageY: 0,
    offsetPageY: 0,
  };

  handleMounseDown = (evt, index) => {
    this.setState({
      dragging: true,
      startPageY: evt.pageY,
      currentPageY: evt.pageY,
      draggingIndex: index,
    });
  };
  handleMouseUp = () => {
    this.setState({ dragging: false, startPageY: 0, draggingIndex: -1 });
  };
  handleMouseMove = evt => {
    let offset = evt.pageY - this.state.startPageY;
    const draggingIndex = this.state.draggingIndex;
    if (offset > lineHeight && draggingIndex < this.state.list.length - 1) {
      // move down
      offset -= lineHeight;
      this.setState({
        list: move(this.state.list, draggingIndex, draggingIndex + 1),
        draggingIndex: draggingIndex + 1,
        startPageY: this.state.startPageY + lineHeight,
      });
    } else if (offset < -lineHeight && draggingIndex > 0) {
      // move up
      offset += lineHeight;
      this.setState({
        list: move(this.state.list, draggingIndex, draggingIndex - 1),
        draggingIndex: draggingIndex - 1,
        startPageY: this.state.startPageY - lineHeight,
      });
    }
    this.setState({ offsetPageY: offset });
  };

  getDraggingStyle(index) {
    if (index !== this.state.draggingIndex) return {};
    return {
      backgroundColor: "#eee",
      transform: `translate(10px, ${this.state.offsetPageY}px)`,
      opacity: 0.5,
    };
  }

  render() {
    return (
      <div className="dnd-sample">
        <ul>
          {this.state.list.map((text, i) => (
            <li
              key={text}
              onMouseDown={evt => this.handleMounseDown(evt, i)}
              style={this.getDraggingStyle(i)}
            >
              {text}
            </li>
          ))}
        </ul>
        {this.state.dragging && (
          <div
            className="dnd-sample-mask"
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
          />
        )}
      </div>
    );
  }
}

export default DndSample;
