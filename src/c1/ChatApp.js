import React from "react";
import { render } from "react-dom";
import withTimer from "../c6/withTimer";

class MessageList extends React.PureComponent {
  render() {
    return <ul>{this.props.messages.map(msg => <li>{msg}</li>)}</ul>;
  }
}

export default class ChatApp extends React.Component {
  state = {
    messages: [],
    inputMsg: ""
  };

  handleInput = evt => {
    this.setState({
      inputMsg: evt.target.value
    });
  };
  handleSend = () => {
    const text = this.state.inputMsg;
    if (text) {
      const newMessages = [...this.state.messages, text];
      this.setState({
        messages: newMessages,
        inputMsg: ""
      });
    }
  };
  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <div>
          <input value={this.state.inputMsg} onChange={this.handleInput} />
          <button onClick={this.handleSend}>Send</button>
        </div>
      </div>
    );
  }
}
