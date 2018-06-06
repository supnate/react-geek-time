import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Comment extends PureComponent {
  static propTypes = {
    comment: PropTypes.object.isRequired
  };
  render() {
    const { author, content } = this.props.comment;
    return (
      <div className="comment-item">
        <span className="avatar" />
        <a href="#">{author}</a>
        <p>{content}</p>
      </div>
    );
  }
}
