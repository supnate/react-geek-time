import React, { Component } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import FormBuilder from "../c29/FormBuilder";

const Option = Select.Option;

const formMeta = {
  colon: true,
  columns: 1,
  elements: [{ key: "email", label: "Email", widget: Input }]
};

class Step1 extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue(this.props.allValues);
  }
  render() {
    return (
      <div>
        <FormBuilder meta={formMeta} form={this.props.form} />
      </div>
    );
  }
}

export default Step1;
