import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Pagination, Table, Input } from "antd";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { fetchList } from "./actions";
import { createSelector } from "reselect";

const getItems = state => state.items;
const getById = state => state.byId;

const dataSourceSelector = createSelector(getItems, getById, (items, byId) => {
  console.log("reselect: get data source");
  if (!items) return [];
  return items.map(id => byId[id]);
});

class ListPage extends React.Component {
  state = { search: "" };
  componentDidMount() {
    const page = this.props.match.params.page || 1;
    if (
      page !== this.props.list.page ||
      !this.getDataSource().length ||
      this.props.list.needReloadList
    )
      this.fetchData(parseInt(page, 10));
  }

  componentDidUpdate(prevProps) {
    const page = parseInt(this.props.match.params.page || 1, 10);
    const prevPage = parseInt(prevProps.match.params.page || 1, 10);
    if (prevPage !== page && !this.props.list.fetchListPending) {
      this.fetchData(page);
    }
  }

  fetchData(page) {
    this.props.fetchList(page);
  }

  getDataSource = dataSourceSelector;

  // getDataSource:() {
  //   console.log("get data source");
  //   const { items, byId } = this.props.list;
  //   if (!items) return [];
  //   return items.map(id => byId[id]);
  // }
  getColumns() {
    return [
      {
        title: "First Name",
        dataIndex: "first_name",
        key: "first_name",
        width: "200px",
        render: (firstName, rec) => (
          <Link to={`/user/${rec.id}`}>{firstName}</Link>
        ),
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
    this.props.history.push(`/list-page/${newPage}`);
    // this.props.fetchList(newPage);
  };
  render() {
    console.log("rrender");
    if (this.props.list.fetchListError) {
      return <div>{this.props.list.fetchListError.error.message}</div>;
    }
    if (!this.props.list.items || !this.props.list.items.length)
      return "loading...";
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
          dataSource={this.getDataSource(this.props.list)}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ListPage),
);
