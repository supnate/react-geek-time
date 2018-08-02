import React, { Component } from "react";
import _ from "lodash";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select
} from "antd";
import FormBuilder from "../c29/FormBuilder";

const Option = Select.Option;

const formMeta = {
  colon: true,
  columns: 1,
  elements: [
    {
      key: "userName",
      label: "User name",
      tooltip: "user name",
      widget: Input,
      required: true
    },
    {
      key: "job",
      label: "Job"
    },
    {
      key: "title",
      label: "Title",
      widget: Input
    }
  ]
};

class DynamicForm extends Component {
  state = {
    jobs: null
  };
  resetForm = () => {
    this.props.form.resetFields();
  };

  componentDidMount() {
    window.setTimeout(() => {
      const jobs = [
        "Software Engineer",
        "Student",
        "Doctor"
      ];
      this.setState(
        {
          jobs
        },
        () => {
          this.props.form.setFieldsValue({
            job: "Software Engineer"
          });
        }
      );
    }, 2000);
  }

  getMeta() {
    return {
      ...formMeta,
      elements: _.compact(
        formMeta.elements.map(m => {
          if (m.key === "job") {
            return {
              ...m,
              widget: Select,
              initialValue: "loading",
              children: this.state.jobs
                ? this.state.jobs.map(job => (
                    <Option key={job}>{job}</Option>
                  ))
                : [
                    <Option key="loading">
                      Loading...
                    </Option>
                  ]
            };
          }
          if (
            m.key === "title" &&
            this.props.form.getFieldValue("job") !==
              "Software Engineer"
          ) {
            return null;
          }
          return m;
        })
      )
    };
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        layout="horizontal"
        style={{ width: "400px" }}
      >
        <FormBuilder
          meta={this.getMeta()}
          form={this.props.form}
        />
        <div style={{ textAlign: "center" }}>
          <Button
            disabled={!this.state.jobs}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>&nbsp; &nbsp;
          <Button onClick={this.resetForm}>Reset</Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(DynamicForm);
