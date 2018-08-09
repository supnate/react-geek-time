import React from "react";
import _ from "lodash";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Button, Steps, Form, Modal } from "antd";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

class App extends React.Component {
  state = {
    allValues: {}
  };

  pushUrl(path) {
    window.history.pushState(null, "", `/#${path}`);
    this.forceUpdate();
  }

  handleNext = () => {
    console.log("form values: ", this.props.form.getFieldsValue());
    this.setState({
      allValues: {
        ...this.state.allValues,
        ...this.props.form.getFieldsValue()
      }
    });
    const currentStep = this.getCurrentStep();
    if (currentStep < this.getSteps().length - 1) {
      this.pushUrl(this.getSteps()[currentStep + 1].path);
    } else {
      Modal.success({
        title: "提交成功"
      });
    }
  };
  handleBack = () => {
    console.log("form values: ", this.props.form.getFieldsValue());
    this.setState({
      allValues: {
        ...this.state.allValues,
        ...this.props.form.getFieldsValue()
      }
    });
    const currentStep = this.getCurrentStep();
    if (currentStep > 0) {
      this.pushUrl(this.getSteps()[currentStep - 1].path);
    }
  };

  getCurrentStep() {
    const currentPath = document.location.hash.replace(/^#/, "");
    return _.findIndex(this.getSteps(), { path: currentPath });
  }

  getSteps() {
    return [
      { title: "验证邮件", path: "/wizard/step/1", component: Step1 },
      { title: "账号信息", path: "/wizard/step/2", component: Step2 },
      { title: "完成", path: "/wizard/step/3", component: Step3 }
    ];
  }
  renderComponent = () => {
    const StepComponent = this.getSteps()[this.getCurrentStep()].component;
    return (
      <StepComponent form={this.props.form} allValues={this.state.allValues} />
    );
  };
  render() {
    if (!/^#\/wizard\/step/.test(document.location.hash)) {
      return (
        <Button type="primary" onClick={() => this.pushUrl("/wizard/step/1")}>
          创建账号
        </Button>
      );
    }
    return (
      <Router>
        <Form>
          <div style={{ width: "600px" }}>
            <h1>创建账号</h1>
            <Steps current={this.getCurrentStep()}>
              {this.getSteps().map(step => <Steps.Step title={step.title} />)}
            </Steps>

            <div className="step-container" style={{ margin: "40px 0" }}>
              <Route
                path="/wizard/step/:stepId"
                render={this.renderComponent}
              />
            </div>
            <div>
              <Button
                disabled={this.getCurrentStep() === 0}
                onClick={this.handleBack}
                style={{ marginRight: "20px" }}
              >
                上一步
              </Button>

              <Button onClick={this.handleNext} type="primary">
                {this.getCurrentStep() === this.getSteps().length - 1
                  ? "完成"
                  : "下一步"}
              </Button>
            </div>
          </div>
        </Form>
      </Router>
    );
  }
}

export default Form.create()(App);
