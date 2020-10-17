import { takeLatest, call, put } from "redux-saga/effects";
import {
  createWalletApi,
  getWalletApi,
  rewardViewApi,
  getHistoryPointApi,
  getHistoryExchangesApi,
  getExchangeRateAPI,
  createExchangeApi,
} from "../service/wallet";
import { getToken } from "../utils/token";
import { WALLET } from "../constant";

function* createWallet(object) {
  const dat = object.data.data;
  const resp = yield call(createWalletApi, dat);
  if (resp.code !== 200) {
    yield put({
      type: WALLET.CREATE_WALLET_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: WALLET.CREATE_WALLET_SUCCESS,
    data: resp.data,
  });
}

function* getWallet() {
  const resp = yield call(getWalletApi);
  if (resp.code !== 200) {
    yield put({
      type: WALLET.GET_WALLET_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: WALLET.GET_WALLET_SUCCESS,
    data: resp.data,
  });
}

function* rewardView(object) {
  const dat = object.data.data;
  const resp = yield call(rewardViewApi, dat);
  const { data: { point } = {} } = resp;
  if (!point) {
    yield put({
      type: WALLET.REWARD_VIEW_FAIL,
    });
    return;
  }
  yield put({
    type: WALLET.REWARD_VIEW_SUCCESS,
  });
  yield put({ type: WALLET.GET_WALLET });
}

function* getHistoryPoint(object) {
  const dat = object.data.data;
  const resp = yield call(getHistoryPointApi, dat);
  if (resp.code !== 200) {
    yield put({
      type: WALLET.GET_HISTORY_POINT_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: WALLET.GET_HISTORY_POINT_SUCCESS,
    data: resp.data,
  });
}

function* getHistoryExchanges(object) {
  const dat = object.data;
  const resp = yield call(getHistoryExchangesApi, dat);
  if (resp.code !== 200) {
    yield put({
      type: WALLET.GET_HISTORY_EXCHANGES_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: WALLET.GET_HISTORY_EXCHANGES_SUCCESS,
    data: resp.data,
  });
}

function* getExchangeRate() {
  const resp = yield call(getExchangeRateAPI);
  if (resp.code !== 200) {
    yield put({ type: WALLET.GET_EXCHANGE_RATE_FAIL });
    return;
  }
  yield put({ type: WALLET.GET_EXCHANGE_RATE_SUCCESS, data: resp });
}

function* createExchange(object) {
  const dat = object.data.data;
  const functionCancel = object.data.functionCancel;
  const { data: { userId = "" } = {} } = getToken();
  const resp = yield call(createExchangeApi, dat);
  if (resp.code !== 200) {
    yield put({
      type: WALLET.CREATE_EXCHANGE_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: WALLET.CREATE_EXCHANGE_SUCCESS,
    data: resp.data,
  });
  yield put({ type: WALLET.GET_HISTORY_EXCHANGES, data: { data: userId } });
  functionCancel();
}

export const walletSaga = [
  takeLatest(WALLET.CREATE_WALLET, createWallet),
  takeLatest(WALLET.GET_WALLET, getWallet),
  takeLatest(WALLET.REWARD_VIEW, rewardView),
  takeLatest(WALLET.GET_HISTORY_POINT, getHistoryPoint),
  takeLatest(WALLET.GET_HISTORY_EXCHANGES, getHistoryExchanges),
  takeLatest(WALLET.GET_EXCHANGE_RATE, getExchangeRate),
  takeLatest(WALLET.CREATE_EXCHANGE, createExchange),
];
