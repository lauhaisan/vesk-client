import { takeLatest, call, put } from "redux-saga/effects";
import {
  getListCommentAPI
  // addNewSocialMediaAPI
} from "../service/comment";
import { COMMENTS } from "../constant";

function* getListComment(object) {
  console.log("obj", object);
  const dat = object.data.data;
  const resp = yield call(getListCommentAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: COMMENTS.GET_LIST_COMMENTS_FAIL,
      data: resp.message
    });
    return;
  }
  yield put({
    type: COMMENTS.GET_LIST_COMMENTS_SUCCESS,
    data: resp.data
  });
}

// function* addNewSocialMedia(obj) {
//   const dat = obj.data.data;
//   const hideModal = obj.data.functionHideModal;
//   const resp = yield call(addNewSocialMediaAPI, dat);
//   if (resp.code !== 200) {
//     yield put({ type: SOCIAL_MEDIA.ADD_NEW_FAIL, data: resp.message });
//     return;
//   }
//   yield put({ type: SOCIAL_MEDIA.ADD_NEW_SUCCESS, data: resp.data });
//   hideModal();
//   yield put({ type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA, data: resp.data });
// }

export const commentSaga = [
  takeLatest(COMMENTS.GET_LIST_COMMENTS, getListComment)
  // takeLatest(SOCIAL_MEDIA.ADD_NEW, addNewSocialMedia)
];
