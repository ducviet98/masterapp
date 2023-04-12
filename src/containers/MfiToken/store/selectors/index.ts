import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const certificateState = (state: any) => state.mfiToken || initialState;

const makeSelectIsLoading = () =>
  createSelector(certificateState, (state) => state.isLoading);

const makeSelectIsLoadingAction = () =>
  createSelector(certificateState, (state) => state.isLoadingAction);

const makeSelectErrors = () =>
  createSelector(certificateState, (state) => state.errors);

const makeSelectTotal = () =>
  createSelector(certificateState, (state) => state.total);

const makeSelectMfiToken = () =>
  createSelector(certificateState, (state) => state.mfiTokens);

const makeSelectMfiTokenDetail = () =>
  createSelector(certificateState, (state) => state.mfiDetail);

export {
  makeSelectIsLoading,
  makeSelectErrors,
  makeSelectTotal,
  makeSelectMfiToken,
  makeSelectMfiTokenDetail,
  makeSelectIsLoadingAction,
}
