import request from "../utils/request";
import URL from "../constant/url";
// import queryString from "query-string";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const getListTopRatedAPI = async payload => {
  return request(URL.GET_LIST_TOP_RATED, true);
};

export { getListTopRatedAPI };
