import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const certificateState = (state: any) => state.certificate || initialState;

const makeSelectIsLoading = () =>
  createSelector(certificateState, (state) => state.isLoading);

const makeSelectIsLoadingAction = () =>
  createSelector(certificateState, (state) => state.isLoadingAction);

const makeSelectErrors = () =>
  createSelector(certificateState, (state) => state.errors);

const makeSelectTotal = () =>
  createSelector(certificateState, (state) => state.total);

const makeSelectCertificate = () =>
  createSelector(certificateState, (state) => state.certificates);


const makeSelectCertificateDetail = () =>
  createSelector(certificateState, (state) => state.certificateDetail);

const makeSelectNewCertificate = () =>
  createSelector(certificateState, (state) => state.newCertificate);

export {
  makeSelectIsLoading,
  makeSelectErrors,
  makeSelectTotal,
  makeSelectCertificate,
  makeSelectCertificateDetail,
  makeSelectIsLoadingAction,
  makeSelectNewCertificate
}
