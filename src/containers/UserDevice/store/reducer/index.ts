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
  status: []
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
      default:
        break;
    }
  });

export default usersReduce;
