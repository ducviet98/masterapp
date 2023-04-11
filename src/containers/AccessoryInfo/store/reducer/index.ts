/* eslint-disable */
import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  isLoading: true,
  total: 0,
  accessories: [],
  errors: '',
  isLoadingAction: false,
};

const accessoryInfoReducer = (state = initialState, { type, payload }: any) =>
  produce(state, (draft) => {
    switch (type) {
      case types.GET_ACCESSORY_INFO_REQUEST:
        draft.isLoading = true;
        break;
      case types.GET_ACCESSORY_INFO_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_ACCESSORY_INFO_SUCCESS:
        draft.isLoading = false;
        draft.accessories = payload.results;
        draft.total = payload.count;
        break;

      // CREATE ACCESSORY_INFO
      case types.CREATE_ACCESSORY_INFO_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.CREATE_ACCESSORY_INFO_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.CREATE_ACCESSORY_INFO_SUCCESS:
        const newData: any = [...state.accessories, payload]
        draft.isLoadingAction = false;
        draft.accessories = newData;
        break;

      default:
        break;
    }
  });

export default accessoryInfoReducer;

