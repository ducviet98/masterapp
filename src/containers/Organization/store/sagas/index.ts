import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import CookieHandlerInstance from 'src/utils/cookie';
import AxiosClientInstance from 'src/utils/axios';

import * as actionTypes from '../actions';
import * as types from '../constants';

import { getOrganizationService, createOrganizationService } from '../services';

function* getOrganizationSaga() {
  try {
    const { data } = yield call(getOrganizationService);

    const currentOrganizations = CookieHandlerInstance.getCookie('current_organizations');

    if (currentOrganizations) {
      AxiosClientInstance.setHeaderOrganization(currentOrganizations);
    }

    yield put(actionTypes.getOrganizationSuccess(data));
  } catch (error) {
    yield put(actionTypes.getOrganizationFail(error));
    toast.error('Get Organization Fail !');
  }
}

function* createOrganizationSaga({ payload }: any) {
  try {
    const { data } = yield call(createOrganizationService, payload.name);
    CookieHandlerInstance.setCookie('current_organizations', data.id);
    AxiosClientInstance.setHeaderOrganization(data.id);
    return payload.callback();
  } catch (error) {
    yield put(actionTypes.createOrganizationFail(error));
  }
}

function* switchOrganizationSaga({payload}: any) {
  try {
    CookieHandlerInstance.setCookie('current_organizations', payload.id);
    AxiosClientInstance.setHeaderOrganization(payload.id);
    payload.callback()
  } catch (error) {
    
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_ORGANIZATION_REQUEST, getOrganizationSaga);
  yield takeLatest(types.CREATE_ORGANIZATION_REQUEST, createOrganizationSaga);
}
