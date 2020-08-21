import { MOST_POPULAR } from "../constant";

const INITIAL_STATE = {
  loading: false,
  listMostPopular: [],
  paging: {},
  messageErrorMostPopular: ""
};

const mostPopularReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOST_POPULAR.GET_LIST_POPULAR:
      return {
        ...state,
        loading: true,
        messageErrorMostPopular: ""
      };
    case MOST_POPULAR.GET_LIST_POPULAR_SUCCESS:
      return {
        ...state,
        loading: false,
        listMostPopular: action.data.items,
        paging: action.data.paging,
        messageErrorMostPopular: ""
      };
    case MOST_POPULAR.GET_LIST_POPULAR_FAIL:
      return {
        ...state,
        loading: false,
        listMostPopular: [],
        messageErrorMostPopular: action.data
      };

    default:
      return state;
  }
};

export default mostPopularReducer;
