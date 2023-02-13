import { call, put, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions';
import * as types from '../constants';
import { getUserDeviceService } from '../services';

function* getUserDeviceSaga({ payload }: any) {
  try {
    yield call(getUserDeviceService, payload);
    yield put(actionTypes.getUserDeviceSuccess(payload));
  } catch (error: any) {
    yield put(actionTypes.getUserDeviceFail(payload));
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_USER_DEVICE_REQUEST, getUserDeviceSaga);
}
