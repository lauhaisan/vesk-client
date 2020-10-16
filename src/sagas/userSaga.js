import { takeLatest, call, put, delay } from "redux-saga/effects";
import {
  signUpAPI,
  signInAPI,
  // logoutAPI
  getMyInfoAPI,
} from "../service/user";
import { setToken } from "../utils/token";
import { USER } from "../constant";

function* handleSignUp(object) {
  const dat = object.data.data;
  const history = object.data.history;
  yield delay(500);
  const resp = yield call(signUpAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: USER.SIGNUP_FAIL, data: resp });
    return;
  }
  const { data = {}, data: { token } = {} } = resp;
  setToken({
    token,
    data,
  });
  yield put({ type: USER.SIGNUP_SUCCESS });
  yield delay(3000);
  yield call(history.push, "/");
}

function* handleSignIn(object) {
  const dat = object.data.data;
  const history = object.data.history;
  yield delay(500);
  const resp = yield call(signInAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: USER.SIGNIN_FAIL, data: resp });
    return;
  }
  const { data = {}, data: { token } = {} } = resp;
  setToken({
    token,
    data,
  });
  yield put({ type: USER.SIGNIN_SUCCESS });
  yield call(history.push, "/");
}

function* getMyInfo(obj) {
  const dat = obj.data.data;
  const resp = yield call(getMyInfoAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: "GET_MY_INFO_FAIL" });
    return;
  }
  yield put({ type: "GET_MY_INFO_SUCCESS", data: resp.data });
}

export const userSaga = [
  takeLatest(USER.SIGNUP, handleSignUp),
  takeLatest(USER.SIGNIN, handleSignIn),
  takeLatest(USER.GET_MY_INFO, getMyInfo),
];
