import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const userDeviceState = (state: any) => state.device || initialState;

const makeSelectIsLoading = () =>
  createSelector(userDeviceState, (state) => state.isLoading);

const makeSelectErrors = () =>
  createSelector(userDeviceState, (state) => state.errors);

const makeSelectTotalUsers = () =>
  createSelector(userDeviceState, (state) => state.total);

const makeSelectUserDevice = () =>
  createSelector(userDeviceState, (state) => state.userDevice);

const makeSelectListDevice = () =>
  createSelector(userDeviceState, (state) => state.listDevice);

const makeSelectListCategories = () =>
  createSelector(userDeviceState, (state) => state.categories);

const makeSelectListBrands = () =>
  createSelector(userDeviceState, (state) => state.brands);

const makeSelectListStatus = () =>
  createSelector(userDeviceState, (state) => state.status);

export {
  makeSelectIsLoading,
  makeSelectErrors,
  makeSelectTotalUsers,
  makeSelectUserDevice,
  makeSelectListDevice,
  makeSelectListCategories,
  makeSelectListBrands,
  makeSelectListStatus
};
