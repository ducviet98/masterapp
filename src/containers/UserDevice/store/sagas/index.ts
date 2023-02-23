import { call, put, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions';
import * as types from '../constants';
import { getUserDeviceService, getCategoriesService, getBrandsService, getStatusService, createDeviceService } from '../services';

function* getUserDeviceSaga({ payload }: any) {
  try {
    const { data } = yield call(getUserDeviceService, payload);
    yield put(actionTypes.getUserDeviceSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getUserDeviceFail(payload));
  }
}

function* getCategoriesSaga({ payload }: any) {
  try {
    const { data } = yield call(getCategoriesService);
    yield put(actionTypes.getCategoriesSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getCategoriesFail(payload));
  }
}

function* getBrandsSaga() {
  try {
    const { data } = yield call(getBrandsService);
    yield put(actionTypes.getBrandsSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getBrandsFail(error));
  }
}

function* getStatusSaga() {
  try {
    const { data } = yield call(getStatusService);
    yield put(actionTypes.getStatusSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getStatusFail(error));
  }
}

function* createDeviceSaga({ payload }: any) {
  try {
    const { data } = yield call(createDeviceService, payload);
    yield payload.callback();
    yield put(actionTypes.createDeviceSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.createDeviceFail(error));
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_USER_DEVICE_REQUEST, getUserDeviceSaga);
  yield takeLatest(types.GET_CATEGORIES_REQUEST, getCategoriesSaga);
  yield takeLatest(types.GET_BRANDS_REQUEST, getBrandsSaga);
  yield takeLatest(types.GET_STATUS_REQUEST, getStatusSaga);
  yield takeLatest(types.CREATE_DEVICE_REQUEST, createDeviceSaga);
}
