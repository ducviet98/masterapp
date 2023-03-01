/* eslint-disable */
import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  isLoading: true,
  total: 0,
  userDevice: [],
  errors: '',
  listDevice: [],
  brands: [],
  categories: [],
  status: [],
  deviceDetail: {},
};

const usersReduce = (state = initialState, { type, payload }: any) =>
  produce(state, (draft) => {
    switch (type) {
      case types.GET_USER_DEVICE_REQUEST:
        draft.isLoading = true;
        draft.userDevice = [];
        draft.listDevice = [];
        break;
      case types.GET_USER_DEVICE_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_USER_DEVICE_SUCCESS:
        draft.isLoading = false;
        draft.listDevice = payload.results;
        draft.total = payload.count;
        break;
      case types.GET_BRANDS_SUCCESS:
        draft.isLoading = false;
        draft.brands = payload;
        break;
      case types.GET_BRANDS_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_CATEGORIES_SUCCESS:
        draft.isLoading = false;
        draft.categories = payload;
        break;
      case types.GET_CATEGORIES_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_STATUS_SUCCESS:
        draft.isLoading = false;
        draft.status = payload;
        break;
      case types.GET_STATUS_FAIL:
        draft.isLoading = false;
        break;
      // DELETE DEVICE
      case types.DELETE_DEVICE_REQUEST:
        draft.isLoading = true;
        break;
      case types.DELETE_DEVICE_FAIL:
        draft.isLoading = false;
        break;
      case types.DELETE_DEVICE_SUCCESS:
        draft.isLoading = false;
        const newListDevice: any = [
          ...state.listDevice.filter((item: any) => item.id !== payload),
        ];
        draft.listDevice = newListDevice;
        break;
      // GET_DEVICE_DETAIL_REQUEST
      case types.GET_DEVICE_DETAIL_REQUEST:
        draft.isLoading = true;
        draft.deviceDetail = {};
        break;
      case types.GET_DEVICE_DETAIL_SUCCESS:
        draft.isLoading = false;
        draft.deviceDetail = payload;
        break;
      case types.GET_DEVICE_DETAIL_FAIL:
        draft.isLoading = false;
        break;
      // EDIT_DEVICE_REQUEST
      case types.EDIT_DEVICE_REQUEST:
        draft.isLoading = true;
        break;
      case types.EDIT_DEVICE_FAIL:
        draft.isLoading = false;
        break;
      case types.EDIT_DEVICE_SUCCESS:
        draft.isLoading = false;
        draft.deviceDetail = payload;
        break;
      default:
        break;
    }
  });

export default usersReduce;

