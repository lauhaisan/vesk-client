const PRODUCT = {
  GET_ALL_PRODUCT: "GET_ALL_PRODUCT",
  GET_ALL_PRODUCT_SUCCESS: "GET_ALL_PRODUCT_SUCCESS",
  GET_ALL_PRODUCT_FAIL: "GET_ALL_PRODUCT_FAIL",
  CLEAR_DATA: "CLEAR_DATA",
  SET_STATE_REDUCER: "SET_STATE_REDUCER",
};

const USER = {
  SIGNUP: "USER_SIGNUP",
  SIGNUP_SUCCESS: "USER_SIGNUP_SUCCESS",
  SIGNUP_FAIL: "USER_SIGNUP_FAIL",
  SIGNIN: "USER_SIGNIN",
  SIGNIN_SUCCESS: "USER_SIGNIN_SUCCESS",
  SIGNIN_FAIL: "USER_SIGNIN_FAIL",
  EXPIRED_TOKEN: "EXPIRED_TOKEN",
  UPDATE_STATE: "UPDATE_STATE",
  // LOGOUT: "USER_LOGOUT",
  // LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS",
  // LOGOUT_FAIL: "USER_LOGOUT_FAIL",
  GET_MY_INFO: "GET_MY_INFO",
  GET_MY_INFO_SUCCESS: "GET_MY_INFO_SUCCESS",
  GET_MY_INFO_FAIL: "GET_MY_INFO_FAIL",
};

const LIST_USER = {
  GET_LIST_USER: "GET_LIST_USER",
  GET_LIST_USER_SUCCESS: "GET_LIST_USER_SUCCESS",
  GET_LIST_USER_FAIL: "GET_LIST_USER_FAIL",
  GET_USER_BY_ID: "GET_USER_BY_ID",
  GET_USER_BY_ID_SUCCESS: "GET_USER_BY_ID_SUCCESS",
  GET_USER_BY_ID_FAIL: "GET_USER_BY_ID_FAIL",
  EDIT_USER: "EDIT_USER",
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAIL: "EDIT_USER_FAIL",
  UPDATE_LIST_USER_REDUCER: "UPDATE_LIST_USER_REDUCER",
};

const ADVERTISING = {
  GET_LIST_ADS: "GET_LIST_ADS",
  GET_LIST_ADS_SUCCESS: "GET_LIST_ADS_SUCCESS",
  GET_LIST_ADS_FAIL: "GET_LIST_ADS_FAIL",
  GET_ADS_BY_ID: "GET_ADS_BY_ID",
  GET_ADS_BY_ID_SUCCESS: "GET_ADS_BY_ID_SUCCESS",
  GET_ADS_BY_ID_FAIL: "GET_ADS_BY_ID_FAIL",
  EDIT_ADS: "EDIT_ADS",
  EDIT_ADS_SUCCESS: "EDIT_ADS_SUCCESS",
  EDIT_ADS_FAIL: "EDIT_ADS_FAIL",
  SET_STATE_REDUCER: "SET_STATE_REDUCER",
  DELETE_ADS: "DELETE_ADS",
  DELETE_ADS_SUCCESS: "DELETE_ADS_SUCCESS",
  DELETE_ADS_FAIL: "DELETE_ADS_FAIL",
  ADD_NEW_ADS: "ADD_NEW_ADS",
  ADD_NEW_ADS_SUCCESS: "ADD_NEW_ADS_SUCCESS",
  ADD_NEW_ADS_FAIL: "ADD_NEW_ADS_FAIL",
};

const SOCIAL_MEDIA = {
  GET_LIST_SOCIAL_MEDIA: "GET_LIST_SOCIAL_MEDIA",
  GET_LIST_SOCIAL_MEDIA_SUCCESS: "GET_LIST_SOCIAL_MEDIA_SUCCESS",
  GET_LIST_SOCIAL_MEDIA_FAIL: "GET_LIST_SOCIAL_MEDIA_FAIL",
  GET_BY_ID: "GET_BY_ID",
  GET_BY_ID_SUCCESS: "GET_BY_ID_SUCCESS",
  GET_BY_ID_FAIL: "GET_BY_ID_FAIL",
  EDIT_SOCIAL_MEDIA: "EDIT_SOCIAL_MEDIA",
  EDIT_SOCIAL_MEDIA_SUCCESS: "EDIT_SOCIAL_MEDIA_SUCCESS",
  EDIT_SOCIAL_MEDIA_FAIL: "EDIT_SOCIAL_MEDIA_FAIL",
  ADD_NEW: "ADD_NEW",
  ADD_NEW_SUCCESS: "ADD_NEW_SUCCESS",
  ADD_NEW_FAIL: "ADD_NEW_FAIL",
  DELETE_SOCIAL_MEDIA: "DELETE_SOCIAL_MEDIA",
  DELETE_SOCIAL_MEDIA_SUCCESS: "DELETE_SOCIAL_MEDIA_SUCCESS",
  DELETE_SOCIAL_MEDIA_FAIL: "DELETE_SOCIAL_MEDIA_FAIL",
  SEARCH_SOCIAL_MEDIA: "SEARCH_SOCIAL_MEDIA",
  SEARCH_SOCIAL_MEDIA_SUCCESS: "SEARCH_SOCIAL_MEDIA_SUCCESS",
  SEARCH_SOCIAL_MEDIA_FAIL: "SEARCH_SOCIAL_MEDIA_FAIL",
  GET_LIST_BY_AUTHOR: " GET_LIST_BY_AUTHOR",
  GET_LIST_BY_AUTHOR_SUCCESS: " GET_LIST_BY_AUTHOR_SUCCESS",
  GET_LIST_BY_AUTHOR_FAIL: " GET_LIST_BY_AUTHOR_FAIL",
  UPDATE_SOCIAL_MEDIA_REDUCER: "UPDATE_SOCIAL_MEDIA_REDUCER",
};

const TOP_RATED = {
  GET_LIST_TOP_RATED: "GET_LIST_TOP_RATED",
  GET_LIST_TOP_RATED_SUCCESS: "GET_LIST_TOP_RATED_SUCCESS",
  GET_LIST_TOP_RATED_FAIL: "GET_LIST_TOP_RATED_FAIL",
};

const MOST_POPULAR = {
  GET_LIST_POPULAR: "GET_LIST_POPULAR",
  GET_LIST_POPULAR_SUCCESS: "GET_LIST_POPULAR_SUCCESS",
  GET_LIST_POPULAR_FAIL: "GET_LIST_POPULAR_FAIL",
};

const COMMENTS = {
  GET_LIST_COMMENTS: "GET_LIST_COMMENTS",
  GET_LIST_COMMENTS_SUCCESS: "GET_LIST_COMMENTS_SUCCESS",
  GET_LIST_COMMENTS_FAIL: "GET_LIST_COMMENTS_FAIL",
  ADD_COMMENT: "ADD_COMMENT",
  ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
  ADD_COMMENT_FAIL: "ADD_COMMENT_FAIL",
  UPDATE_STATE_COMMENT_REDUCER: "UPDATE_STATE_COMMENT_REDUCER",
};

const WALLET = {
  CREATE_WALLET: "CREATE_WALLET",
  CREATE_WALLET_SUCCESS: "CREATE_WALLET_SUCCESS",
  CREATE_WALLET_FAIL: "CREATE_WALLET_FAIl",
  UPDATE_WALLET_REDUCER: "UPDATE_WALLET_REDUCER",
  GET_WALLET: "GET_WALLET",
  GET_WALLET_FAIL: "GET_WALLET_FAIL",
  GET_WALLET_SUCCESS: "GET_WALLET_SUCCESS",
  REWARD_VIEW: "REWARD_VIEW",
  REWARD_VIEW_SUCCESS: "REWARD_VIEW_SUCCESS",
  REWARD_VIEW_FAIL: "REWARD_VIEW_FAIL",
  GET_HISTORY_POINT: "GET_HISTORY_POINT",
  GET_HISTORY_POINT_SUCCESS: "GET_HISTORY_POINT_SUCCESS",
  GET_HISTORY_POINT_FAIL: "GET_HISTORY_POINT_FAIL",
  GET_HISTORY_EXCHANGES: "GET_HISTORY_EXCHANGES",
  GET_HISTORY_EXCHANGES_SUCCESS: "GET_HISTORY_EXCHANGES_SUCCESS",
  GET_HISTORY_EXCHANGES_FAIL: "GET_HISTORY_EXCHANGES_FAIL",
};

const UPLOAD = {
  UPLOAD_IMAGE: "UPLOAD_IMAGE",
  UPLOAD_IMAGE_SUCCESS: "UPLOAD_IMAGE_SUCCESS",
  UPLOAD_IMAGE_FAIL: "UPLOAD_IMAGE_FAIL",
  UPDATE_STATE_UPLOAD_REDUCER: "UPDATE_STATE_UPLOAD_REDUCER",
};

export {
  PRODUCT,
  USER,
  LIST_USER,
  ADVERTISING,
  SOCIAL_MEDIA,
  TOP_RATED,
  MOST_POPULAR,
  COMMENTS,
  WALLET,
  UPLOAD,
};
