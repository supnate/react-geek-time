import axios from "axios";

// Action creator
export function fetchList(page = 1, keyword = "", pageSize = 3) {
  // action
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: "FETCH_LIST_BEGIN",
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(
        `https://reqres.in/api/users?page=${page}&per_page=${pageSize}&q=${keyword}`,
      );

      doRequest.then(
        res => {
          dispatch({
            type: "FETCH_LIST_SUCCESS",
            data: {
              items: res.data.data,
              page,
              pageSize,
              total: res.data.total,
            },
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: "FETCH_LIST_ERROR",
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function fetchUser(id) {
  // action
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: "FETCH_USER_BEGIN",
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(`https://reqres.in/api/users/${id}`);

      doRequest.then(
        res => {
          dispatch({
            type: "FETCH_USER_SUCCESS",
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: "FETCH_USER_ERROR",
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}
