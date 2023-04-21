import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import AxiosClientInstance from 'src/utils/axios';
import CookieHandlerInstance from 'src/utils/cookie';
import { path } from 'src/constants/path';
import history from 'src/utils/history';

import * as actionTypes from '../actions';
import * as types from '../constants';
import { loginService, refreshTokenService, registerService } from '../services';
import { getOrganizationService } from 'src/containers/Organization/store/services';
interface IKey {
  [key: string]: any;
}

function* registerSaga({ payload }: any) {
  try {
    yield call(registerService, payload);
    yield put(actionTypes.registerSuccess(payload));
    toast.success('Register Successfully !');
    yield payload.callback();
  } catch (error: any) {
    if (error?.data.detail) {
      toast.error(error?.data.detail);
    } else {
      toast.error(error?.data.email[0]);
    }
    yield put(actionTypes.registerFail(payload));
  }
}

function* loginSaga({ payload }: any) {
  const { email, password, isRemember, callback, callbackOrg } = payload;
  try {
    const res: IKey = yield call(loginService, { email, password });
    CookieHandlerInstance.setCookie('token', res.data.access);
    CookieHandlerInstance.setCookie('refreshToken', res.data.refresh);
    AxiosClientInstance.setHeader(res.data.access);

    const { data } = yield call(getOrganizationService);

    if (data.count === 0) {
      return callbackOrg();
    }

    CookieHandlerInstance.setCookie('current_organizations', data.results[0].id);
    AxiosClientInstance.setHeaderOrganization(data.results[0].id);

    if (isRemember === true) {
      const remember = JSON.stringify({ email, password, isRemember });
      yield localStorage.setItem('remember', remember);
    } else {
      yield localStorage.removeItem('remember');
    }
    yield put(actionTypes.loginSuccess(payload));
    yield callback();
  } catch (error: any) {
    toast.error(error.data?.detail);
    yield put(actionTypes.loginFail(payload));
  }
}

function* refreshTokenSaga() {
  try {
    const refreshToken = CookieHandlerInstance.getCookie('refreshToken');
    const {
      data: { access },
    } = yield call(refreshTokenService, refreshToken);
    CookieHandlerInstance.setCookie('token', access);
    AxiosClientInstance.setHeader(access);
    yield put(actionTypes.refreshTokenSuccess());
  } catch (error) {
    CookieHandlerInstance.removeCookie('token');
    CookieHandlerInstance.removeCookie('refreshToken');
    yield put(actionTypes.logoutRequest());
  }
}

function* logoutSaga() {
  try {
    CookieHandlerInstance.removeCookie('token');
    CookieHandlerInstance.removeCookie('refreshToken');
    CookieHandlerInstance.removeCookie('current_organizations');
    window.location.replace(path.login);
    yield put(actionTypes.logoutSuccess());
  } catch (error: any) {
    yield put(actionTypes.logoutFail());
  }
}

export default function* watchApp() {
  yield takeLatest(types.REGISTER_REQUEST, registerSaga);
  yield takeLatest(types.LOGIN_REQUEST, loginSaga);
  yield takeLatest(types.REFRESH_TOKEN_REQUEST, refreshTokenSaga);
  yield takeLatest(types.LOGOUT_REQUEST, logoutSaga);
}
