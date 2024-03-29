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
      case types.UPDATE_ROLE_REQUEST:
        draft.isLoading = true;
        break;
      case types.UPDATE_ROLE_SUCCESS:
        draft.isLoading = false;
        const newRoles: any = state.roles.map((item: any) =>
          item.id === payload.id
            ? { ...item, name: payload.name, permissions: payload.permissions }
            : item
        );
        draft.roles = newRoles;
        break;
      case types.UPDATE_ROLE_FAIL:
        draft.isLoading = false;
        break;
      case types.DELETE_ROLE_REQUEST:
        draft.isLoading = true;
        break;
      case types.DELETE_ROLE_SUCCESS:
        draft.isLoading = false;
        const newDeleteRole: any = state.roles.filter(
          (item: any) => !payload.ids.includes(item.id)
        );
        draft.roles = newDeleteRole;
        break;
      case types.DELETE_ROLE_FAIL:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default managerRoleReduce;
