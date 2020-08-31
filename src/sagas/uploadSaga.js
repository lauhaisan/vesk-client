import { takeLatest, call, put } from "redux-saga/effects";
import { uploadApi } from "../service/upload";
import { UPLOAD } from "../constant";

function* createWallet(object) {
  const dat = object.data.data;
  console.log("dat", dat);
  const resp = yield call(uploadApi, dat);
  // if (resp.code !== 200) {
  //   yield put({
  //     type: UPLOAD.UPLOAD_IMAGE_FAIL,
  //     data: resp.message,
  //   });
  //   return;
  // }
  // yield put({
  //   type: UPLOAD.UPLOAD_IMAGE_SUCCESS,
  //   data: resp.data,
  // });
}

export const uploadSaga = [takeLatest(UPLOAD.UPLOAD_IMAGE, createWallet)];
