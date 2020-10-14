import request from "../utils/request";
import URL from "../constant/url";

// request( param1: url, param2: isAuth, param3: method = "GET", param4: payload)

const signUpAPI = async (payload) => {
  return request(URL.SIGNUP, false, "POST", payload);
};

const signInAPI = async (payload) => {
  return request(URL.SIGNIN, false, "POST", payload);
};

// const logoutAPI = async () => {
//   const { refreshToken } = await getToken();
//   const payload = { refreshToken };
//   return request(URL.LOGOUT, false, "POST", payload);
// };

const getMyInfoAPI = async (payload) => {
  const URL_WITH_PARAMS = `${URL.GET_MY_INFO}?${payload}`;
  return request(URL_WITH_PARAMS, true);
};

const sendFormCreateWebSiteAPI = async (payload) => {
  return request(URL.CREATE_WEB, true, "POST", payload);
};

export {
  signUpAPI,
  signInAPI,
  // logoutAPI
  getMyInfoAPI,
  sendFormCreateWebSiteAPI,
};
