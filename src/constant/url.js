const URL = {
  //USER
  SIGNUP: "/v1/auth/register",
  SIGNIN: "/v1/auth/login",
  LOGOUT: "/user/logout",
  REFRESH_TOKEN: "/user/refresh-token",
  GET_MY_INFO: "/v1/vesk/users/my-info",
  // GET_USER_INFO: "/v1/vesk/users/my-info",
  PRODUCT: "/products",
  GET_LIST_USER: "/v1/vesk/public/users/search",
  GET_USER_BY_ID: "/v1/vesk/public/users/userId",
  EDIT_USER: "/v1/vesk/users",

  //ADVERTISING
  GET_LIST_ADVERTISING: "/v1/vesk/public/ads",
  ADD_NEW_ADVERTISING: "/v1/vesk/ads",
  GET_LIST_ADS_BY_AUTHOR: "/v1/vesk/ads/search",

  //SOCIAL MEDIA
  GET_LIST_SOCIAL_MEDIA: "/v1/vesk/public/e-social-media",
  EDIT_DELETE_SOCIAL_MEDIA: "/v1/vesk/e-social-media",
  SOCIAL_MEDIA_SEARCH: "/v1/vesk/public/e-social-media/search",
  GET_LIST_MEDIA_BY_ATHOR: "/v1/vesk/public/e-social-media/author",
  ADD_NEW_VIDEO: "/v1/vesk/e-social-media",
  SEARCH_LIST_BY_ATHOR: "/v1/vesk/e-social-media/search",
  ADD_POINT_VIDEO: "/v1/vesk/e-social-media/add-point",

  //TOP RATED, MOST POPULAR
  GET_LIST_TOP_RATED: "/v1/vesk/public/e-social-media/top/search",
  GET_LIST_MOST_POPULAR: "​/v1/vesk/public/e-social-media/most-popular/search",

  //COMMENT
  ADD_COMMENT: "/v1/vesk/comment",
  GET_LIST_COMMENT: "/v1/vesk/public/comment/post",

  //WALLET
  WALLET: "/v1/vesk/wallet",
  REWARD_VIEW: "/v1/vesk/exchange/reward-view",
  GET_HISTORY_POINT: "/v1/vesk/wallet-history/user",
  GET_HISTORY_EXCHANGE: "/v1/vesk/exchanges/user",
  GET_EXCHANGE_RATE: "/v1/vesk/rate-setting/search",
  CREATE_EXCHANGE: "/v1/vesk/exchange",

  //CREATE WEBSITE:
  CREATE_WEB: "/v1/vesk/public/website",
};

export default URL;
