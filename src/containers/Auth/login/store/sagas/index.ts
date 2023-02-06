import { put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions";
import * as types from "../constants";


function* loginSaga() {
  try {
  } catch (error) {
  }
}

function* logoutSaga() {
  try {
    window.location.replace('/login')
    yield put(actionTypes.logoutSuccess());
  } catch (error: any) {
    yield put(actionTypes.logoutFail());
  }
}

export default function* watchApp() {
  yield takeLatest(types.LOGIN_REQUEST, loginSaga);
  yield takeLatest(types.LOGOUT_REQUEST, logoutSaga);
}