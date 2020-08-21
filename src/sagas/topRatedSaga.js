import { takeLatest, call, put } from "redux-saga/effects";
import { getListTopRatedAPI } from "../service/topRated";
import { TOP_RATED } from "../constant";

function* getListTopRated(object) {
  const dat = object.data;
  const resp = yield call(getListTopRatedAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: TOP_RATED.GET_LIST_TOP_RATED_FAIL,
      data: resp.message
    });
    return;
  }
  yield put({
    type: TOP_RATED.GET_LIST_TOP_RATED_SUCCESS,
    data: resp.data
  });
}

export const topRatedSaga = [
  takeLatest(TOP_RATED.GET_LIST_TOP_RATED, getListTopRated)
];
