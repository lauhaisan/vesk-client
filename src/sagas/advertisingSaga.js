import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  getListAdsAPI,
  getAdsByIdAPI,
  editAdsAPI,
  deleteAdsByIdAPI,
  addNewAdsAPI,
  getListAdsByAuthorAPI,
} from "../service/advertising";
import { ADVERTISING, WALLET } from "../constant";

const stateAds = (state) => state.advertising;

function* getListAds(object) {
  try {
    const dat = object.data;
    const resp = yield call(getListAdsAPI, dat);
    if (resp.code !== 200) throw resp;
    yield put({ type: ADVERTISING.GET_LIST_ADS_SUCCESS, data: resp.data });
  } catch (error) {
    yield put({ type: ADVERTISING.GET_LIST_ADS_FAIL, data: error.message });
  }
}

function* getAdsById(obj) {
  const dat = obj.data.id;
  const resp = yield call(getAdsByIdAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.GET_ADS_BY_ID_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.GET_ADS_BY_ID_SUCCESS, data: resp.data });
}

function* editAds(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const currentPage = obj.data.currentPage;
  const resp = yield call(editAdsAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.EDIT_ADS_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.EDIT_ADS_SUCCESS, data: resp.data });
  hideModal();
  yield put({
    type: ADVERTISING.GET_ADS_BY_AUTHOR,
    data: { page: currentPage, limit: 10 },
  });
}

function* deleteAdsById(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const currentPage = obj.data.currentPage;
  const { pagingListAdsByAuthor: { total } = {} } = yield select(stateAds);
  const resp = yield call(deleteAdsByIdAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.DELETE_ADS_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.DELETE_ADS_SUCCESS, data: resp.data });
  hideModal();
  const totalPage = Math.ceil((total - 1) / 10);
  const page = totalPage < currentPage ? currentPage - 1 : currentPage;
  yield put({
    type: ADVERTISING.GET_ADS_BY_AUTHOR,
    data: { page: page !== 0 ? page : 1, limit: 10 },
  });
}

function* addNewAds(obj) {
  const dat = obj.data.data;
  const hideModal = obj.data.functionHideModal;
  const currentPage = obj.data.currentPage;
  const resp = yield call(addNewAdsAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.ADD_NEW_ADS_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.ADD_NEW_ADS_SUCCESS, data: resp.data });
  hideModal();
  yield put({ type: WALLET.GET_WALLET });
  yield put({
    type: ADVERTISING.GET_ADS_BY_AUTHOR,
    data: { page: currentPage, limit: 10 },
  });
}

function* getListAdsByAuthor(obj) {
  const dat = obj.data;
  const resp = yield call(getListAdsByAuthorAPI, dat);
  if (resp.code !== 200) {
    yield put({ type: ADVERTISING.GET_ADS_BY_AUTHOR_FAIL, data: resp.message });
    return;
  }
  yield put({ type: ADVERTISING.GET_ADS_BY_AUTHOR_SUCCESS, data: resp.data });
}

export const advertisingSaga = [
  takeLatest(ADVERTISING.GET_LIST_ADS, getListAds),
  takeLatest(ADVERTISING.GET_ADS_BY_ID, getAdsById),
  takeLatest(ADVERTISING.EDIT_ADS, editAds),
  takeLatest(ADVERTISING.DELETE_ADS, deleteAdsById),
  takeLatest(ADVERTISING.ADD_NEW_ADS, addNewAds),
  takeLatest(ADVERTISING.GET_ADS_BY_AUTHOR, getListAdsByAuthor),
];
