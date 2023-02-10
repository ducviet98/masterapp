import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import * as actionTypes from '../actions';
import * as types from '../constants';
import { registerService } from '../services';

function* registerSaga({ payload }: any) {
  try {
    yield call(registerService, payload);
    yield put(actionTypes.registerSuccess(payload));
    toast.success('Register Successfully !');
    yield payload.callback();
  } catch (error: any) {
    toast.error(error?.data.message);
    yield put(actionTypes.registerFail(payload));
  }
}

function* logoutSaga() {
  try {
    window.location.replace('/login');
    yield put(actionTypes.logoutSuccess());
  } catch (error: any) {
    yield put(actionTypes.logoutFail());
  }
}

export default function* watchApp() {
  yield takeLatest(types.REGISTER_REQUEST, registerSaga);
  yield takeLatest(types.LOGOUT_REQUEST, logoutSaga);
}
