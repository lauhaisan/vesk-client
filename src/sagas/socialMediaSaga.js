import { takeLatest, call, put } from "redux-saga/effects";
import {
  getListSocialMediaAPI,
  getByIdAPI,
  editSocialMediaAPI,
  deleteSocialMediaAPI,
  addNewSocialMediaAPI,
  searchSocialMediaAPI,
  getListByAuthorAPI,
  searchListByAuthorAPI,
  addPointVideoAPI,
} from "../service/socialMedia";
import { SOCIAL_MEDIA, WALLET } from "../constant";
import { getToken } from "../utils/token";

function* getListSocialMedia(object) {
  const dat = object.data;
  const resp = yield call(getListSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA_SUCCESS,
    data: resp.data,
  });
}

function* getSocialMediaById(obj) {
  const dat = obj.data.id;
  const resp = yield call(getByIdAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: SOCIAL_MEDIA.GET_BY_ID_FAIL, data: resp.message });
    return;
  }
  yield put({ type: SOCIAL_MEDIA.GET_BY_ID_SUCCESS, data: resp.data });
}

function* editSocialMedia(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const { data: { userId: id = "" } = {} } = getToken();
  const data = { id };
  const resp = yield call(editSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({ type: SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA_SUCCESS, data: resp.data });
  hideModal();
  yield put({ type: SOCIAL_MEDIA.GET_LIST_BY_AUTHOR, data: { data } });
}

function* deleteSocialMedia(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const { data: { userId: id = "" } = {} } = getToken();
  const data = { id };
  const resp = yield call(deleteSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA_SUCCESS,
    data: resp.data,
  });
  hideModal();
  yield put({ type: SOCIAL_MEDIA.GET_LIST_BY_AUTHOR, data: { data } });
}

function* addNewSocialMedia(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const { data: { userId: id = "" } = {} } = getToken();
  const data = { id };
  const resp = yield call(addNewSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: SOCIAL_MEDIA.ADD_NEW_FAIL, data: resp.message });
    return;
  }
  yield put({ type: SOCIAL_MEDIA.ADD_NEW_SUCCESS, data: resp.data });
  hideModal();
  yield put({ type: SOCIAL_MEDIA.GET_LIST_BY_AUTHOR, data: { data } });
  yield put({ type: WALLET.GET_WALLET });
}

function* searchSocialMedia(obj) {
  const dat = obj.data.data;
  const resp = yield call(searchSocialMediaAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA_SUCCESS,
    data: resp.data,
  });
}

function* getListByAuthor(object) {
  const dat = object.data.data;
  const resp = yield call(getListByAuthorAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.GET_LIST_BY_AUTHOR_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: SOCIAL_MEDIA.GET_LIST_BY_AUTHOR_SUCCESS,
    data: resp.data,
  });
}

function* searchListByAuthor(object) {
  const dat = object.data.data;
  const resp = yield call(searchListByAuthorAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.SEARCH_LIST_BY_AUTHOR_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({
    type: SOCIAL_MEDIA.SEARCH_LIST_BY_AUTHOR_SUCCESS,
    data: resp.data,
  });
}

function* addPointVideo(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const { data: { userId: id = "" } = {} } = getToken();
  const data = { id };
  const resp = yield call(addPointVideoAPI, dat);
  if (resp.code !== 200) {
    yield put({
      type: SOCIAL_MEDIA.ADD_POINT_VIDEO_FAIL,
      data: resp.message,
    });
    return;
  }
  yield put({ type: SOCIAL_MEDIA.ADD_POINT_VIDEO_SUCCESS, data: resp.data });
  hideModal();
  yield put({ type: SOCIAL_MEDIA.GET_LIST_BY_AUTHOR, data: { data } });
  yield put({ type: WALLET.GET_WALLET });
}

export const socialMediaSaga = [
  takeLatest(SOCIAL_MEDIA.GET_LIST_SOCIAL_MEDIA, getListSocialMedia),
  takeLatest(SOCIAL_MEDIA.GET_BY_ID, getSocialMediaById),
  takeLatest(SOCIAL_MEDIA.EDIT_SOCIAL_MEDIA, editSocialMedia),
  takeLatest(SOCIAL_MEDIA.ADD_NEW, addNewSocialMedia),
  takeLatest(SOCIAL_MEDIA.SEARCH_SOCIAL_MEDIA, searchSocialMedia),
  takeLatest(SOCIAL_MEDIA.DELETE_SOCIAL_MEDIA, deleteSocialMedia),
  takeLatest(SOCIAL_MEDIA.GET_LIST_BY_AUTHOR, getListByAuthor),
  takeLatest(SOCIAL_MEDIA.SEARCH_LIST_BY_AUTHOR, searchListByAuthor),
  takeLatest(SOCIAL_MEDIA.ADD_POINT_VIDEO, addPointVideo),
];
