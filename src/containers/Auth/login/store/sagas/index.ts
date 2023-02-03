import { put, takeLatest, call } from "redux-saga/effects";
import CookieHandlerInstance from 'src/utils/cookie';
import AxiosClientInstance from 'src/utils/axios';

import * as types from "../constants";
import * as actionTypes from "../actions";
import { loginService, refreshTokenService } from "../services";

function* loginSaga(action) {
  const { data } = action.payload;
  try {
    const res = yield call(loginService, data)
    CookieHandlerInstance.setCookie(
      'token',
      res.data.token.token
    );
    CookieHandlerInstance.setCookie(
      'refreshToken',
      res.data.token.refreshToken
    );
    yield put(actionTypes.loginSuccess(data));
    yield data.callback()
  } catch (error) {
    yield put(actionTypes.loginFail(error?.data.message));
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


function* refreshTokenSaga() {
  try {
    const refreshToken = CookieHandlerInstance.getCookie('refreshToken');
    const {
      data: { access_token },
    } = yield call(refreshTokenService, refreshToken);
    CookieHandlerInstance.setCookie('token', access_token);
    AxiosClientInstance.setHeader(access_token);

    yield put(actionTypes.refreshTokenSuccess());
  } catch (error) {
    yield put(actionTypes.refreshTokenFail());
    CookieHandlerInstance.removeCookie('token');
    CookieHandlerInstance.removeCookie('refreshToken');
    yield put(actionTypes.logoutRequest());
  }
}

export default function* watchApp() {
  yield takeLatest(types.LOGIN_REQUEST, loginSaga);
  yield takeLatest(types.LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(types.REFRESH_TOKEN_REQUEST, refreshTokenSaga);
}