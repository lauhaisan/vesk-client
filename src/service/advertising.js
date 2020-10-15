import request from "../utils/request";
import URL from "../constant/url";
import queryString from "query-string";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const getListAdsAPI = async (payload) => {
  return request(URL.GET_LIST_ADVERTISING, true);
};

const getAdsByIdAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.GET_LIST_ADVERTISING}/${payload}`;
  return request(URL_WITH_PARAMS, true);
};

const editAdsAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.ADD_NEW_ADVERTISING}/${payload.id}`;
  return request(URL_WITH_PARAMS, true, "PUT", payload);
};

const deleteAdsByIdAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.ADD_NEW_ADVERTISING}/${payload.id}`;
  return request(URL_WITH_PARAMS, true, "DELETE");
};

const addNewAdsAPI = async (payload) => {
  return request(URL.ADD_NEW_ADVERTISING, true, "POST", payload);
};

const getListAdsByAuthorAPI = async (payload) => {
  // const { data: { userId = "" } = {} } = getToken();
  // const URL_WITH_PARAMS = `${URL.GET_LIST_ADS_BY_AUTHOR}/${userId}/search`;
  // console.log("URL_WITH_PARAMS", URL_WITH_PARAMS);
  const param = queryString.stringify(payload);
  const URL_WITH_PARAMS = `${URL.GET_LIST_ADS_BY_AUTHOR}?${param}`;
  return request(URL_WITH_PARAMS, true);
};

export {
  getListAdsAPI,
  getAdsByIdAPI,
  editAdsAPI,
  deleteAdsByIdAPI,
  addNewAdsAPI,
  getListAdsByAuthorAPI,
};
