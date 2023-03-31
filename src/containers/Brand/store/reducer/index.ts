/* eslint-disable */
import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  isLoading: true,
  total: 0,
  brands: [],
  errors: '',
  brandDetail: {},
  isLoadingAction: false,
};

const brandReducer = (state = initialState, { type, payload }: any) =>
  produce(state, (draft) => {
    switch (type) {
      case types.GET_BRAND_REQUEST:
        draft.isLoading = true;
        break;
      case types.GET_BRAND_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_BRAND_SUCCESS:
        draft.isLoading = false;
        draft.brands = payload.results;
        draft.total = payload.count;
        break;

      // CREATE BRAND
      case types.CREATE_BRAND_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.CREATE_BRAND_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.CREATE_BRAND_SUCCESS:
        const newData: any = [...state.brands, payload]
        draft.isLoadingAction = false;
        draft.brands = newData;
        break;
      // DELETE BRAND
      case types.DELETE_BRAND_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.DELETE_BRAND_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.DELETE_BRAND_SUCCESS:
        draft.isLoadingAction = false;
        break;

      // EDIT BRAND
      case types.EDIT_BRAND_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.EDIT_BRAND_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.EDIT_BRAND_SUCCESS:
        console.log('payload', payload);

        draft.isLoadingAction = false;
        draft.brandDetail = payload;
        break;
      // GET_BRAND_DETAIL_REQUEST
      case types.GET_BRAND_DETAIL_REQUEST:
        draft.isLoading = true;
        break;
      case types.GET_BRAND_DETAIL_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_BRAND_DETAIL_SUCCESS:
        draft.isLoading = false;
        draft.brandDetail = payload;
        break;
      default:
        break;
    }
  });

export default brandReducer;

