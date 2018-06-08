import React from "react";
import { bindActionCreators, createStore } from "redux";
import { Provider, connect } from "react-redux";

// Store initial state
const initialState = { count: 0 };

// reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    case "PLUS_ONE":
      return { count: state.count + 1 };
    case "MINUS_ONE":
      return { count: state.count - 1 };
    case "CUSTOM_COUNT":
      return { count: state.count + action.payload.count };
    default:
      break;
  }
  return state;
};

// Create store
const store = createStore(counter);

// Action creator
function plusOne() {
  // action
  return { type: "PLUS_ONE" };
}

function minusOne() {
  return { type: "MINUS_ONE" };
}

export class Counter extends React.Component {
  render() {
    const { count, plusOne, minusOne } = this.props;
    return (
      <div className="counter">
        <button onClick={minusOne}>-</button>
        <span style={{ display: "inline-block", margin: "0 10px" }}>
          {count}
        </span>
        <button onClick={plusOne}>+</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ plusOne, minusOne }, dispatch);
}

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default class CounterSample extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedCounter />
      </Provider>
    );
  }
}
