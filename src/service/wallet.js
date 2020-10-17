import request from "../utils/request";
import URL from "../constant/url";
import queryString from "query-string";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const createWalletApi = async (payload) => {
  return request(URL.WALLET, true, "POST", payload);
};

const getWalletApi = async () => {
  return request(URL.WALLET, true, "GET");
};

const rewardViewApi = async (payload) => {
  return request(URL.REWARD_VIEW, true, "POST", payload);
};

const getHistoryPointApi = async ({ id, page, limit }) => {
  const objParam = { page, limit };
  const param = queryString.stringify(objParam);
  const URL_WITH_PARAMS = `${URL.GET_HISTORY_POINT}?${param}`;
  return request(URL_WITH_PARAMS, true);
};

const getHistoryExchangesApi = async ({ id, page, limit }) => {
  const objParam = { page, limit };
  const param = queryString.stringify(objParam);
  const URL_WITH_PARAMS = `${URL.GET_HISTORY_EXCHANGE}/${id}?${param}`;
  return request(URL_WITH_PARAMS, true);
};

const getExchangeRateAPI = async () => {
  return request(URL.GET_EXCHANGE_RATE, true);
};

const createExchangeApi = async (payload) => {
  return request(URL.CREATE_EXCHANGE, true, "POST", payload);
};

export {
  createWalletApi,
  getWalletApi,
  rewardViewApi,
  getHistoryPointApi,
  getHistoryExchangesApi,
  getExchangeRateAPI,
  createExchangeApi,
};
