import { takeLatest, call, put } from "redux-saga/effects";
import { getListCommentAPI, addNewCommentAPI } from "../service/comment";
import { COMMENTS } from "../constant";

function* getListComment(object) {
  const dat = object.data.data;
  const resp = yield call(getListCommentAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: COMMENTS.GET_LIST_COMMENTS_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: COMMENTS.GET_LIST_COMMENTS_SUCCESS,
    data: resp.data,
  });
}

function* addNewComment(obj) {
  const dat = obj.data.data;
  const resp = yield call(addNewCommentAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: COMMENTS.ADD_COMMENT_FAIL, data: resp.message });
    return;
  }
  yield put({ type: COMMENTS.ADD_COMMENT_SUCCESS, data: resp.data });
  yield put({ type: COMMENTS.GET_LIST_COMMENTS, data: { data: dat.postId } });
}

export const commentSaga = [
  takeLatest(COMMENTS.GET_LIST_COMMENTS, getListComment),
  takeLatest(COMMENTS.ADD_COMMENT, addNewComment),
];
