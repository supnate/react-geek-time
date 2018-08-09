import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Pagination, Table, Input } from "antd";
import { Link } from "react-router-dom";
import { fetchList } from "./actions";

class ListPage extends React.Component {
  state = { search: "" };
  componentDidMount() {
    this.props.fetchList();
  }

  getDataSource() {
    const { items, byId } = this.props.list;
    if (!items) return [];
    return items.map(id => byId[id]);
  }
  getColumns() {
    return [
      {
        title: "First Name",
        dataIndex: "first_name",
        key: "first_name",
        width: "200px",
      },
      {
        title: "Last Name",
        dataIndex: "last_name",
        key: "last_name",
        width: "200px",
      },
    ];
  }
  handleSearch = keyword => {
    const { page, pageSize } = this.props.list;
    this.props.fetchList(page, pageSize, keyword);
  };
  handlePageChange = newPage => {
    this.props.fetchList(newPage);
  };
  render() {
    if (!this.props.list.items) return "loading...";
    const { page, total, pageSize, keyword } = this.props.list;
    return (
      <div>
        <h2>User List</h2>
        <Input.Search
          value={this.state.search}
          onChange={e => this.setState({ search: e.target.value })}
          style={{ width: "200px" }}
          onSearch={this.handleSearch}
        />
        <br />
        <br />
        <Table
          dataSource={this.getDataSource()}
          columns={this.getColumns()}
          style={{ width: "400px" }}
          rowKey="id"
          loading={this.props.list.fetchListPending}
          pagination={false}
        />
        <br />
        <Pagination
          current={page}
          onChange={this.handlePageChange}
          total={total}
          pageSize={pageSize}
        />
        <Link to="/user/1">User</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchList }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListPage);
