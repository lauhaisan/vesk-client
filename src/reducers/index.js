import { combineReducers } from "redux";
// import productReducer from "./productReducer";
import userReducer from "./userReducer";
import listUserReducer from "./listUserReducer";
import advertisingReducer from "./advertisingReducer";
import socialMediaReducer from "./socialMediaReducer";
import topRatedReducer from "./topRatedReducer";
import mostPopularReducer from "./mostPopularReducer";
import commentReducer from "./commentReducer";
import walletReducer from "./walletReducer";
import uploadReducer from "./uploadReducer";
import createWebSiteReducer from "./createWebSiteReducer";

const rootReducer = combineReducers({
  // products: productReducer,
  user: userReducer,
  listUser: listUserReducer,
  advertising: advertisingReducer,
  socialMedia: socialMediaReducer,
  topRated: topRatedReducer,
  mostPopular: mostPopularReducer,
  comment: commentReducer,
  wallet: walletReducer,
  upload: uploadReducer,
  createWebSite: createWebSiteReducer,
});

export default rootReducer;
