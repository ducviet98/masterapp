/* eslint-disable */

import produce from 'immer';

import { ActionType, GlobalTypes } from '../../interfaces';
import * as types from '../constants';

export const initialState: GlobalTypes = {
  isLoading: false,
  errors: null,
};

const appReducer = (state = initialState, { type, payload }: ActionType) =>
  produce(state, (draft: GlobalTypes) => {
    switch (type) {
      case types.SHOW_LOADING:
        draft.isLoading = true;
        break;
      case types.HIDE_LOADING:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });

export default appReducer;
