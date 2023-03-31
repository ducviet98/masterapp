import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const certificateState = (state: any) => state.brand || initialState;

const makeSelectIsLoading = () =>
  createSelector(certificateState, (state) => state.isLoading);

const makeSelectIsLoadingAction = () =>
  createSelector(certificateState, (state) => state.isLoadingAction);

const makeSelectErrors = () =>
  createSelector(certificateState, (state) => state.errors);

const makeSelectTotal = () =>
  createSelector(certificateState, (state) => state.total);

const makeSelectBrand = () =>
  createSelector(certificateState, (state) => state.brands);


const makeSelectBrandDetail = () =>
  createSelector(certificateState, (state) => state.brandDetail);

export {
  makeSelectIsLoading,
  makeSelectErrors,
  makeSelectTotal,
  makeSelectBrand,
  makeSelectBrandDetail,
  makeSelectIsLoadingAction,
}
