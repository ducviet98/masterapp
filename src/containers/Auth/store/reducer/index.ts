/* eslint-disable */
import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  authenticated: false,
  isLoading: false,
  errors: '',
};

const authReducer = (state = initialState, { type, payload }: any) =>
  produce(state, (draft) => {
    switch (type) {
      case types.LOGIN_REQUEST:
        draft.isLoading = true;
        draft.authenticated = true;
        break;
      case types.LOGIN_SUCCESS:
        draft.isLoading = false;
        draft.authenticated = false;
        draft.errors = '';
        break;
      case types.LOGIN_FAIL:
        draft.isLoading = false;
        draft.authenticated = false;
        draft.errors = payload.data;
        break;

      case types.REGISTER_REQUEST:
        draft.isLoading = true;
        break;
      case types.REGISTER_SUCCESS:
        draft.isLoading = false;
        draft.errors = '';
        break;
      case types.REGISTER_FAIL:
        draft.isLoading = false;
        draft.errors = payload.data;
        break;
      default:
        break;
    }
  });

export default authReducer;
