import React, { Component } from "react";

class Step3 extends Component {
  render() {
    const { email, userName, birthday } = this.props.allValues;
    return (
      <div className="wizard-finish-step">
        <ul>
          <li>
            <label>Email:</label>
            <span>{email}</span>
          </li>
          <li>
            <label>用户名:</label>
            <span>{userName}</span>
          </li>
          <li>
            <label>生日:</label>
            <span>{birthday ? birthday.format("M月D日") : ""}</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Step3;
