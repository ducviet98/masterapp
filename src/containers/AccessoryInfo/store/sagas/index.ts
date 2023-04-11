import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions';
import * as types from '../constants';
import {
  createAccessoryInfoService,
  getAccessoryInfoService
} from '../services';


function* getAccessoryInfoSaga({ payload }: any) {
  try {
    const { data } = yield call(getAccessoryInfoService, payload);
    yield put(actionTypes.getAccessoryInfoSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getAccessoryInfoFail(error));
    toast.error('Get AccessoryInfo Fail !');
  }
}

function* createAccessoryInfoSaga({ payload }: any) {
  try {
    const { data } = yield call(createAccessoryInfoService, payload);
    yield payload.callback();
    yield put(actionTypes.createAccessoryInfoSuccess(data));
    toast.success('Create AccessoryInfo Successfully !');
  } catch (error: any) {
    yield put(actionTypes.createAccessoryInfoFail(error));
    toast.error('Create AccessoryInfo Fail !');
  }
}


export default function* watchApp() {
  yield takeLatest(types.GET_ACCESSORY_INFO_REQUEST, getAccessoryInfoSaga);
  yield takeLatest(types.CREATE_ACCESSORY_INFO_REQUEST, createAccessoryInfoSaga);
}
