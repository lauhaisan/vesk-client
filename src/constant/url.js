const URL = {
  //USER
  SIGNUP: "/v1/auth/register",
  SIGNIN: "/v1/auth/login",
  LOGOUT: "/user/logout",
  REFRESH_TOKEN: "/user/refresh-token",
  GET_MY_INFO: "/v1/vesk/users/my-info",
  // GET_USER_INFO: "/v1/vesk/users/my-info",
  PRODUCT: "/products",

  GET_LIST_USER: "/v1/vesk/users/search",
  GET_USER_BY_ID: "/v1/vesk/users/userId",
  EDIT_USER: "/v1/vesk/users",

  //ADVERTISING
  GET_LIST_ADVERTISING: "/v1/vesk/ads",
  ADMIN_CRUD_ADVERTISING: "/v1/vesk/admin/ads",

  //SOCIAL MEDIA
  GET_LIST_SOCIAL_MEDIA: "/v1/vesk/e-social-media",
  ADMIN_CRUD_SOCIAL_MEDIA: "/v1/vesk/admin/e-social-media",
  SOCIAL_MEDIA_SEARCH: "/v1/vesk/e-social-media/search",
  GET_LIST_SOCIAL_MEDIA_BY_AUTHOR: "/v1/vesk/e-social-media/author",

  //TOP RATED, MOST POPULAR
  GET_LIST_TOP_RATED: "/v1/vesk/e-social-media/top/search",
  GET_LIST_MOST_POPULAR: "/v1/vesk/e-social-media/most-popular/search",

  //COMMENT
  ADD_COMMENT: "/v1/vesk/comment",
  GET_LIST_COMMENT: "/v1/vesk/comment/post",
};

export default URL;
