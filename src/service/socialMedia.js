import request from "../utils/request";
import URL from "../constant/url";
import queryString from "query-string";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const getListSocialMediaAPI = async (payload) => {
  const param = queryString.stringify(payload);
  const URL_WITH_PARAMS = `${URL.SOCIAL_MEDIA_SEARCH}?${param}`;
  return request(URL_WITH_PARAMS, true);
};

const getByIdAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.GET_LIST_SOCIAL_MEDIA}/Id/${payload}`;
  return request(URL_WITH_PARAMS, true);
};

const editSocialMediaAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.EDIT_DELETE_SOCIAL_MEDIA}/${payload.id}`;
  return request(URL_WITH_PARAMS, true, "PUT", payload);
};

const deleteSocialMediaAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.EDIT_DELETE_SOCIAL_MEDIA}/${payload.id}`;
  return request(URL_WITH_PARAMS, true, "DELETE");
};

const addNewSocialMediaAPI = async (payload) => {
  return request(URL.ADD_NEW_VIDEO, true, "POST", payload);
};

const searchSocialMediaAPI = async (payload) => {
  const param = queryString.stringify(payload);
  const URL_WITH_PARAMS = `${URL.SOCIAL_MEDIA_SEARCH}?${param}`;
  return request(URL_WITH_PARAMS, true);
};

const getListByAuthorAPI = async ({ id, page, limit }) => {
  const obj = { page, limit };
  const param = queryString.stringify(obj);
  const URL_WITH_PARAMS = `${URL.GET_LIST_MEDIA_BY_ATHOR}/${id}/search?${param}`;
  return request(URL_WITH_PARAMS, true);
};

const searchListByAuthorAPI = async (payload) => {
  const param = queryString.stringify(payload);
  const URL_WITH_PARAMS = `${URL.SEARCH_LIST_BY_ATHOR}?${param}`;
  return request(URL_WITH_PARAMS, true);
};

const addPointVideoAPI = async (payload) => {
  return request(URL.ADD_POINT_VIDEO, true, "POST", payload);
};

export {
  getListSocialMediaAPI,
  getByIdAPI,
  editSocialMediaAPI,
  deleteSocialMediaAPI,
  addNewSocialMediaAPI,
  searchSocialMediaAPI,
  getListByAuthorAPI,
  searchListByAuthorAPI,
  addPointVideoAPI,
};
