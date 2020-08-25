import request from "../utils/request";
import URL from "../constant/url";
// import queryString from "query-string";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const createWalletApi = async payload => {
  return request(URL.WALLET, true, "POST", payload);
};

const getWalletApi = async () => {
  return request(URL.WALLET, true, "GET");
};

const rewardViewApi = async payload => {
  return request(URL.REWARD_VIEW, true, "POST", payload);
};

export { createWalletApi, getWalletApi, rewardViewApi };
