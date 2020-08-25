import { takeLatest, call, put } from "redux-saga/effects";
import {
  createWalletApi,
  getWalletApi,
  rewardViewApi
} from "../service/wallet";
import { WALLET } from "../constant";

function* createWallet(object) {
  const dat = object.data.data;
  const resp = yield call(createWalletApi, dat);
  if (resp.code !== 200) {
    yield put({
      type: WALLET.CREATE_WALLET_FAIL,
      data: resp.message
    });
    return;
  }
  yield put({
    type: WALLET.CREATE_WALLET_SUCCESS,
    data: resp.data
  });
}

function* getWallet() {
  const resp = yield call(getWalletApi);
  if (resp.code !== 200) {
    yield put({
      type: WALLET.GET_WALLET_FAIL,
      data: resp.message
    });
    return;
  }
  yield put({
    type: WALLET.GET_WALLET_SUCCESS,
    data: resp.data
  });
}

function* rewardView(object) {
  const dat = object.data.data;
  const resp = yield call(rewardViewApi, dat);
  const { data: { point } = {} } = resp;
  if (!point) {
    yield put({
      type: WALLET.REWARD_VIEW_FAIL
    });
    return;
  }
  yield put({
    type: WALLET.REWARD_VIEW_SUCCESS
  });
  yield put({ type: WALLET.GET_WALLET });
}

export const walletSaga = [
  takeLatest(WALLET.CREATE_WALLET, createWallet),
  takeLatest(WALLET.GET_WALLET, getWallet),
  takeLatest(WALLET.REWARD_VIEW, rewardView)
];
