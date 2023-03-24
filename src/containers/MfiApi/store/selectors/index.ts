import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const mfiApiState = (state: any) => state.mfiApi || initialState;

const makeSelectIsLoading = () =>
  createSelector(mfiApiState, (state) => state.isLoading);

const makeSelectIsLoadingAction = () =>
  createSelector(mfiApiState, (state) => state.isLoadingAction);

const makeSelectErrors = () =>
  createSelector(mfiApiState, (state) => state.errors);

const makeSelectTotal = () =>
  createSelector(mfiApiState, (state) => state.total);

const makeSelectMfiApi = () =>
  createSelector(mfiApiState, (state) => state.mfiApis);

const makeSelectMfiApiDetail = () =>
  createSelector(mfiApiState, (state) => state.mfiApiDetail);

const makeSelectRequestMfiApi = () =>
  createSelector(mfiApiState, (state) => state.requestApi);

export {
  makeSelectIsLoading,
  makeSelectErrors,
  makeSelectTotal,
  makeSelectMfiApi,
  makeSelectMfiApiDetail,
  makeSelectIsLoadingAction,
  makeSelectRequestMfiApi
}
