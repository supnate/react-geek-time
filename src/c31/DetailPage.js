import React from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchUser } from "./actions";

class DetailPage extends React.Component {
  componentDidMount() {
    if (!this.getUser())
      this.props.fetchUser(this.props.match.params.userId);
  }

  getUser() {
    return this.props.list.byId
      ? this.props.list.byId[this.props.match.params.userId]
      : null;
  }

  render() {
    const user = this.getUser();
    if (!user) return "loading...";

    return <div>User</div>;
  }
}

function mapStateToProps(state) {
  return {
    list: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPage);
