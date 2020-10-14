import { CREATE_WEBSITE } from "../constant";

const INITIAL_STATE = {
  loading: false,
  messageError: "",
  actionSuccessfully: "",
};

const createWebSiteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_WEBSITE.CREATE_WEBSITE:
      return {
        ...state,
        loading: true,
        messageError: "",
        actionSuccessfully: "",
      };
    case CREATE_WEBSITE.CREATE_WEBSITE_SUCCESS:
      return {
        ...state,
        loading: false,
        messageError: "",
        actionSuccessfully: true,
      };
    case CREATE_WEBSITE.CREATE_WEBSITE_FAIL:
      return {
        ...state,
        loading: false,
        messageError: action.data,
        actionSuccessfully: false,
      };

    case CREATE_WEBSITE.UPDATE_CREATE_WEBSITE_REDUCER:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default createWebSiteReducer;
