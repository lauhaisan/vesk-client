import request from "../utils/request";
import URL from "../constant/url";
import queryString from "query-string";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const getListPopularAPI = async (payload) => {
  const param = queryString.stringify(payload);
  const URL_WITH_PARAMS = `${URL.GET_LIST_MOST_POPULAR}?${param}`;
  console.log(URL_WITH_PARAMS);
  return request(URL_WITH_PARAMS, true);
};

export { getListPopularAPI };
