const initialState = {
  items: [],
  page: 1,
  pageSize: 3,
  total: 0,
  byId: {},
  fetchListPending: false,
  fetchListError: null,
  listNeedReload: false,
};
// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LIST_BEGIN":
      return {
        ...state,
        fetchListPending: true,
        fetchListError: null,
      };
    case "FETCH_LIST_SUCCESS": {
      const byId = {};
      const items = [];
      action.data.items.forEach(item => {
        items.push(item.id);
        byId[item.id] = item;
      });
      return {
        ...state,
        byId,
        items,
        page: action.data.page,
        pageSize: action.data.pageSize,
        total: action.data.total,
        fetchListPending: false,
        fetchListError: null,
      };
    }
    case "FETCH_LIST_ERROR":
      return {
        ...state,
        fetchListPending: false,
        fetchListError: action.data,
      };
      break;
    default:
      break;
  }
  return state;
};
