import request from "../utils/request";
import URL from "../constant/url";
// import queryString from "query-string";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const getListCommentAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.GET_LIST_COMMENT}/${payload}`;
  return request(URL_WITH_PARAMS, true);
};

const addNewCommentAPI = async (payload) => {
  return request(URL.ADD_COMMENT, true, "POST", payload);
};

export { getListCommentAPI, addNewCommentAPI };
