import React, { Component } from "react";
import _ from "lodash";
import { Button, DatePicker, Form, Input, Select } from "antd";
import FormBuilder from "../c29/FormBuilder";

const Option = Select.Option;

const fetchUserInfo = id => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        userName: "Nate",
        province: "shanghai",
        city: "pudong",
      });
    }, 1000);
  });
};

const fetchProvices = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { name: "北京", key: "beijing" },
        { name: "上海", key: "shanghai" },
        { name: "江苏", key: "jiangsu" },
        { name: "山东", key: "shandong" },
      ]);
    }, 1000);
  });
};

const fetchCities = province => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        {
          beijing: [
            { name: "朝阳", key: "chaoyang" },
            { name: "海淀", key: "haidian" },
          ],
          shanghai: [
            { name: "浦东", key: "pudong" },
            { name: "徐汇", key: "xuhui" },
          ],
          jiangsu: [
            { name: "南京", key: "nanjing" },
            { name: "苏州", key: "suzhou" },
          ],
          shandong: [
            { name: "青岛", key: "qingdao" },
            { name: "德州", key: "dezhou" },
          ],
        }[province],
      );
    }, 1000);
  });
};

const formMeta = {
  colon: true,
  columns: 1,
  elements: [
    {
      key: "userName",
      label: "Name",
      tooltip: "user name",
      widget: Input,
      required: true,
    },
    {
      key: "province",
      label: "Province",
    },
    {
      key: "city",
      label: "City",
    },
  ],
};

class MultipleRequest extends Component {
  state = {
    userData: null,
    provinces: null,
    cities: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetchProvices().then(data => this.setState({ provinces: data }));
    fetchUserInfo().then(data => {
      this.setState({ userData: data });
      fetchCities(data.province).then(cities => this.setState({ cities }));
    });
  }

  getMeta() {
    const { userData } = this.state;
    return {
      ...formMeta,
      elements: _.compact(
        formMeta.elements.map(m => {
          if (m.key === "province") {
            m = {
              ...m,
              widgetProps: {
                onChange: this.handleProvinceChange,
              },
            };
          }
          if (m.key === "province" || m.key === "city") {
            const values = this.state[
              m.key === "province" ? "provinces" : "cities"
            ];
            return {
              ...m,
              widget: Select,
              initialValue:
                values && userData && userData[m.key]
                  ? userData[m.key]
                  : "loading",
              children: values
                ? values.map(p => <Option key={p.key}>{p.name}</Option>)
                : [<Option key="loading">Loading...</Option>],
            };
          }
          return {
            ...m,
            initialValue: userData ? userData[m.key] : "",
          };
        }),
      ),
    };
  }

  handleProvinceChange = newProvince => {
    this.setState({ cities: null });
    fetchCities(newProvince).then(cities =>
      this.setState({
        cities,
        userData: {
          ...this.state.userData,
          city: cities[0].key,
        },
      }),
    );
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        layout="horizontal"
        style={{ width: "400px" }}
      >
        <FormBuilder meta={this.getMeta()} form={this.props.form} />
        <div style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

export default Form.create()(MultipleRequest);
