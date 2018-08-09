import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import withTimer from "../c06/withTimer";
import "./CommentBox.css";

const comments = [
  {
    author: "Nate",
    content: "Hello React! This is a sample comment.",
  },
  { author: "Kevin", content: "Hello Redux!" },
  { author: "Bood", content: "Hello Rekit!" },
];
export class CommentBox extends React.PureComponent {
  render() {
    return (
      <div className="comment-box">
        <h1>Comments ({comments.length})</h1>
        <CommentList comments={comments} />
        <CommentForm />
        {this.props.time.getTime()}
      </div>
    );
  }
}

export default withTimer(CommentBox);
