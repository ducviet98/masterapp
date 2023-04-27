/* eslint-disable */
import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  isLoading: false,
  total: 0,
  roles: [],
  error: '',
  permissions: [],
};

const managerRoleReduce = (state = initialState, { type, payload }: any) =>
  produce(state, (draft) => {
    switch (type) {
      case types.GET_PERMISSION_REQUEST:
        draft.permissions = [];
        break;
      case types.GET_PERMISSION_SUCCESS:
        draft.permissions = payload.permissions;
        break;
      case types.GET_PERMISSION_FAIL:
        draft.permissions = [];
        break;
      case types.GET_ROLE_REQUEST:
        draft.isLoading = true;
        draft.roles = [];
        draft.total = 0;
        break;
      case types.GET_ROLE_SUCCESS:
        draft.isLoading = false;
        draft.roles = payload.results;
        draft.total = payload.count;
        break;
      case types.GET_ROLE_FAIL:
        draft.isLoading = false;
        draft.roles = [];
        draft.total = 0;
        break;
      case types.CREATE_ROLE_REQUEST:
        draft.isLoading = true;
        break;
      case types.CREATE_ROLE_SUCCESS:
        draft.isLoading = false;
        break;
      case types.CREATE_ROLE_FAIL:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default managerRoleReduce;
