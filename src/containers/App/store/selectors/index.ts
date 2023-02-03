import { createSelector } from 'reselect';
import { initialState } from '../reducers';

const selectGlobal = (state: any) => state.global || initialState;

const makeSelectLoading = () =>
  createSelector(selectGlobal, state => state.isLoading);

export { makeSelectLoading };
