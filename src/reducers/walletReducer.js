import { WALLET } from "../constant";

const INITIAL_STATE = {
  loading: false,
  myWallet: {},
  messageErrorWallet: "",
  isRewaredViewSuccessfully: "",
  historyPoint: {},
  historyExchanges: {},
};

const socialMediaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WALLET.CREATE_WALLET:
      return {
        ...state,
        loading: true,
        messageErrorWallet: "",
      };
    case WALLET.CREATE_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        myWallet: action.data,
        messageErrorWallet: "",
      };
    case WALLET.CREATE_WALLET_FAIL:
      return {
        ...state,
        loading: false,
        myWallet: {},
        messageErrorWallet: action.data,
      };
    case WALLET.GET_WALLET:
      return {
        ...state,
        loading: true,
        messageErrorWallet: "",
      };
    case WALLET.GET_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        myWallet: action.data,
        messageErrorWallet: "",
      };
    case WALLET.GET_WALLET_FAIL:
      return {
        ...state,
        loading: false,
        myWallet: {},
        messageErrorWallet: action.data,
      };
    case WALLET.REWARD_VIEW:
      return {
        ...state,
        isRewaredViewSuccessfully: "",
      };
    case WALLET.REWARD_VIEW_SUCCESS:
      return {
        ...state,
        isRewaredViewSuccessfully: true,
      };
    case WALLET.REWARD_VIEW_FAIL:
      return {
        ...state,
        isRewaredViewSuccessfully: false,
      };
    case WALLET.GET_HISTORY_POINT:
      return {
        ...state,
        loading: true,
        messageErrorWallet: "",
      };
    case WALLET.GET_HISTORY_POINT_SUCCESS:
      return {
        ...state,
        loading: false,
        historyPoint: action.data,
        messageErrorWallet: "",
      };
    case WALLET.GET_HISTORY_POINT_FAIL:
      return {
        ...state,
        loading: false,
        historyPoint: {},
        messageErrorWallet: action.data,
      };
    case WALLET.GET_HISTORY_EXCHANGES:
      return {
        ...state,
        loading: true,
        messageErrorWallet: "",
      };
    case WALLET.GET_HISTORY_EXCHANGES_SUCCESS:
      return {
        ...state,
        loading: false,
        historyExchanges: action.data,
        messageErrorWallet: "",
      };
    case WALLET.GET_HISTORY_EXCHANGES_FAIL:
      return {
        ...state,
        loading: false,
        historyExchanges: {},
        messageErrorWallet: action.data,
      };

    case WALLET.UPDATE_WALLET_REDUCER:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default socialMediaReducer;
