import { combineReducers } from "redux";
// import productReducer from "./productReducer";
import userReducer from "./userReducer";
import listUserReducer from "./listUserReducer";
import advertisingReducer from "./advertisingReducer";
import socialMediaReducer from "./socialMediaReducer";
import topRatedReducer from "./topRatedReducer";

const rootReducer = combineReducers({
  // products: productReducer,
  user: userReducer,
  listUser: listUserReducer,
  advertising: advertisingReducer,
  socialMedia: socialMediaReducer,
  topRated: topRatedReducer
});

export default rootReducer;
