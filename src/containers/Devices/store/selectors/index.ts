import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const DeviceState = (state: any) => state.device || initialState;

const makeSelectIsLoading = () =>
  createSelector(DeviceState, (state) => state.isLoading);

const makeSelectErrors = () =>
  createSelector(DeviceState, (state) => state.errors);

const makeSelectTotalUsers = () =>
  createSelector(DeviceState, (state) => state.total);

const makeSelectUserDevice = () =>
  createSelector(DeviceState, (state) => state.userDevice);

const makeSelectListDevice = () =>
  createSelector(DeviceState, (state) => state.listDevice);

const makeSelectListCategories = () =>
  createSelector(DeviceState, (state) => state.categories);

const makeSelectListBrands = () =>
  createSelector(DeviceState, (state) => state.brands);

const makeSelectListStatus = () =>
  createSelector(DeviceState, (state) => state.status);

const makeSelectDeviceDetail = () =>
  createSelector(DeviceState, (state) => state.deviceDetail);

const makeSelectLoadingAction = () =>
  createSelector(DeviceState, (state) => state.isLoadingAction);

export {
  makeSelectIsLoading,
  makeSelectErrors,
  makeSelectTotalUsers,
  makeSelectUserDevice,
  makeSelectListDevice,
  makeSelectListCategories,
  makeSelectListBrands,
  makeSelectListStatus,
  makeSelectDeviceDetail,
  makeSelectLoadingAction
};
