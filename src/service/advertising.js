import request from "../utils/request";
import { getToken } from "../utils/token";
import URL from "../constant/url";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const getListAdsAPI = async (payload) => {
  return request(URL.GET_LIST_ADVERTISING, true);
};

const getAdsByIdAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.GET_LIST_ADVERTISING}/${payload}`;
  return request(URL_WITH_PARAMS, true);
};

const editAdsAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.ADMIN_CRUD_ADVERTISING}/${payload.id}`;
  return request(URL_WITH_PARAMS, true, "PUT", payload);
};

const deleteAdsByIdAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.ADMIN_CRUD_ADVERTISING}/${payload.id}`;
  return request(URL_WITH_PARAMS, true, "DELETE");
};

const addNewAdsAPI = async (payload) => {
  return request(URL.ADMIN_CRUD_ADVERTISING, true, "POST", payload);
};

const getListAdsByAuthorAPI = async () => {
  const { data: { userId = "" } = {} } = getToken();
  const URL_WITH_PARAMS = `${URL.GET_LIST_ADS_BY_AUTHOR}/${userId}/search`;
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
