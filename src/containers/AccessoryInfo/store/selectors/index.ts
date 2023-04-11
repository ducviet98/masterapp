import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const accessoryInfoState = (state: any) => state.accessoryInfo || initialState;

const makeSelectIsLoading = () =>
  createSelector(accessoryInfoState, (state) => state.isLoading);

const makeSelectIsLoadingAction = () =>
  createSelector(accessoryInfoState, (state) => state.isLoadingAction);

const makeSelectErrors = () =>
  createSelector(accessoryInfoState, (state) => state.errors);

const makeSelectTotal = () =>
  createSelector(accessoryInfoState, (state) => state.total);

const makeSelectAccessoryInfo = () =>
  createSelector(accessoryInfoState, (state) => state.accessories);

export {
  makeSelectIsLoading,
  makeSelectErrors,
  makeSelectTotal,
  makeSelectAccessoryInfo,
  makeSelectIsLoadingAction,
};

