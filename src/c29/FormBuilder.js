import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Form, Icon, Row, Tooltip } from "antd";

const FormItem = Form.Item;

const defaultFormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

function pickProps(source, props) {
  const target = {};
  props.forEach(prop => {
    if (prop in source) target[prop] = source[prop];
  });
  return target;
}

let ID_SEED = 0;
function getId() {
  ID_SEED += 1;
  return `form_builder_id_${ID_SEED}`;
}

class FormBuilder extends Component {
  static propTypes = {
    meta: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    disabled: false,
    one: false
  };

  constructor(props) {
    super(props);
    this.renderElement = this.renderElement.bind(this);
  }

  getMeta() {
    const { meta } = this.props;
    return meta.elements ? meta : { elements: [meta] };
  }

  renderElement(element) {
    const meta = this.getMeta();

    // Handle form item props
    const label = element.tooltip ? (
      <span>
        {element.label}
        <Tooltip title={element.tooltip}>
          {" "}
          <Icon type="question-circle-o" />
        </Tooltip>
      </span>
    ) : (
      element.label
    );

    const formItemProps = {
      key: element.key,
      colon: meta.colon,
      ...(meta.formItemLayout ||
        (element.label ? defaultFormItemLayout : null)),
      label,
      ...pickProps(element, [
        "help",
        "extra",
        "labelCol",
        "wrapperCol",
        "colon",
        "hasFeedback",
        "validateStatus",
        "hasFeedback"
      ]),
      ...element.formItemProps
    };

    if (element.render) {
      return element.render.call(this, {
        formItemProps,
        element,
        disabled: this.props.disabled
      });
    }

    // Handle field props
    let rules = element.rules || [];
    if (element.required) {
      rules = [
        ...rules,
        {
          required: true,
          message: `${element.label ||
            element.key} is required.` // default to English, if needs localization, pass message to it.
        }
      ];
    }
    const fieldProps = {
      ...pickProps(element, [
        "getValueFromEvent",
        "initialValue",
        "normalize",
        "trigger",
        "valuePropName",
        "validateTrigger",
        "validateFirst"
      ]),
      rules,
      ...element.fieldProps
    };

    // Handle widget props
    const wp = element.widgetProps || {};
    const widgetProps = {
      ...pickProps(element, [
        "placeholder",
        "type",
        "className",
        "class"
      ]),
      ...wp,
      disabled:
        element.disabled ||
        wp.disabled ||
        this.props.disabled
    };

    if (!element.id) {
      // widgetProps.id = formItemProps.id = getId();
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem {...formItemProps}>
        {getFieldDecorator(
          element.id || element.key,
          fieldProps
        )(
          <element.widget {...widgetProps}>
            {element.children || null}
          </element.widget>
        )}
      </FormItem>
    );
  }

  renderLayout(elements) {
    // Layout the form in columns
    const columns = this.props.meta.columns || 1;
    if (columns === 1) return elements;
    const gutter = this.props.meta.gutter || 0;
    const rows = [];
    const colspan = 24 / columns;
    for (let i = 0; i < elements.length; i += columns) {
      const cols = [];
      for (let j = 0; j < columns; j += 1) {
        cols.push(
          <Col key={j} span={colspan.toString()}>
            {elements[i + j]}
          </Col>
        );
      }
      rows.push(
        <Row key={i} gutter={gutter}>
          {cols}
        </Row>
      );
    }
    return rows;
  }

  render() {
    return this.renderLayout(
      this.getMeta().elements.map(this.renderElement)
    );
  }
}

export default FormBuilder;
