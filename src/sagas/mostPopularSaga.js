import { takeLatest, call, put, delay } from "redux-saga/effects";
import { getListPopularAPI } from "../service/mostPopular";
import { MOST_POPULAR } from "../constant";

function* getlistPopular(object) {
  const dat = object.data;
  const resp = yield call(getListPopularAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: MOST_POPULAR.GET_LIST_POPULAR_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: MOST_POPULAR.GET_LIST_POPULAR_SUCCESS,
    data: resp.data,
  });
}

function* getMoreListPopular(object) {
  const dat = object.data;
  const resp = yield call(getListPopularAPI, dat);
  const { code, message, data } = resp;
  if (code !== 200) {
    yield put({
      type: MOST_POPULAR.LOAD_MORE_LIST_POPULAR_FAIL,
      data: message,
    });
    return;
  }
  yield delay(700);
  yield put({
    type: MOST_POPULAR.LOAD_MORE_LIST_POPULAR_SUCCESS,
    data: data,
  });
}

export const mostPopularSaga = [
  takeLatest(MOST_POPULAR.GET_LIST_POPULAR, getlistPopular),
  takeLatest(MOST_POPULAR.LOAD_MORE_LIST_POPULAR, getMoreListPopular),
];
