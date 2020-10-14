import { takeLatest, call, put } from "redux-saga/effects";
import { sendFormCreateWebSiteAPI } from "../service/user";
import { CREATE_WEBSITE } from "../constant";

function* sendFormCreateWebSite(object) {
  const dat = object.data.data;
  const functionResetForm = object.data.resetForm;
  const resp = yield call(sendFormCreateWebSiteAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: CREATE_WEBSITE.CREATE_WEBSITE_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: CREATE_WEBSITE.CREATE_WEBSITE_SUCCESS,
  });
  functionResetForm();
}

export const createWebSiteSaga = [
  takeLatest(CREATE_WEBSITE.CREATE_WEBSITE, sendFormCreateWebSite),
];
