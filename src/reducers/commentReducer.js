import { COMMENTS } from "../constant";

const INITIAL_STATE = {
  loading: false,
  listComment: [],
  paging: {},
  messageErrorComment: "",
  loadingAction: false,
  actionSuccessfully: "",
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMENTS.GET_LIST_COMMENTS:
      return {
        ...state,
        loading: true,
        messageErrorComment: "",
      };
    case COMMENTS.GET_LIST_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        listComment: action.data.items,
        paging: action.data.paging,
        messageErrorComment: "",
      };
    case COMMENTS.GET_LIST_COMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        listComment: [],
        messageErrorComment: action.data,
      };

    case COMMENTS.ADD_COMMENT:
      return {
        ...state,
        loadingAction: true,
        actionSuccessfully: "",
        messageErrorComment: "",
      };
    case COMMENTS.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        actionSuccessfully: true,
        messageErrorComment: "",
      };
    case COMMENTS.ADD_COMMENT_FAIL:
      return {
        ...state,
        loadingAction: false,
        actionSuccessfully: false,
        messageErrorComment: action.data,
      };

    case COMMENTS.UPDATE_STATE_COMMENT_REDUCER:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default commentReducer;
