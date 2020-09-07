import { takeLatest, call } from "redux-saga/effects";
import { uploadApi } from "../service/upload";
import { UPLOAD } from "../constant";

function* upload(object) {
  const dat = object.data.data;
  const resp = yield call(uploadApi, dat);
  console.log("resp", resp);
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

export const uploadSaga = [takeLatest(UPLOAD.UPLOAD_IMAGE, upload)];
