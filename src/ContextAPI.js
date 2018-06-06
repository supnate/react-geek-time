import React from "react";

const ThemeContext = React.createContext("light");
class ThemeProvider extends React.Component {
  state = { theme: "light" };
  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
export default class ContextAPI extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <ThemeContext.Consumer>{val => <div>{val}</div>}</ThemeContext.Consumer>
      </ThemeProvider>
    );
  }
}
