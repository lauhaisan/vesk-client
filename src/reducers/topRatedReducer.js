import { TOP_RATED } from "../constant";

const INITIAL_STATE = {
  loading: false,
  listTopRated: [],
  paging: {},
  messageErrorTopRated: "",
};

const topRatedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOP_RATED.GET_LIST_TOP_RATED:
      return {
        ...state,
        loading: true,
        messageErrorTopRated: "",
      };
    case TOP_RATED.GET_LIST_TOP_RATED_SUCCESS:
      return {
        ...state,
        loading: false,
        listTopRated: action.data.items,
        paging: action.data.paging,
        messageErrorTopRated: "",
      };
    case TOP_RATED.GET_LIST_TOP_RATED_FAIL:
      return {
        ...state,
        loading: false,
        listTopRated: [],
        messageErrorTopRated: action.data,
      };
    case TOP_RATED.LOAD_MORE_TOP_RATED:
      return {
        ...state,
        loading: true,
        messageError: "",
      };
    case TOP_RATED.LOAD_MORE_TOP_RATED_SUCCESS:
      const newList = action.data.items;
      const { listTopRated } = state;
      return {
        ...state,
        loading: false,
        listTopRated: [...listTopRated, ...newList],
        paging: action.data.paging,
        messageError: "",
      };
    case TOP_RATED.LOAD_MORE_TOP_RATED_FAIL:
      return {
        ...state,
        loading: false,
        listTopRated: [],
        messageError: action.data,
      };

    default:
      return state;
  }
};

export default topRatedReducer;
