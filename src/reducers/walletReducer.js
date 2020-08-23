import { WALLET } from "../constant";

const INITIAL_STATE = {
  loading: false,
  myWallet: {},
  messageErrorWallet: "",
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
