import { createSelector } from 'reselect';

export const selectGlobal = state => state.get('app');

export const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => {
      const currentUser = globalState.get('currentUser');
      return currentUser ? currentUser.toJS() : currentUser;
    }
  );

export const makeSelectUserLoaded = () =>
  createSelector(
    selectGlobal,
    globalState => {
      const currentUser = globalState.get('currentUser');
      return currentUser ? true : currentUser;
    }
  );

export const makeSelectAppLoading = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.get('appLoading');
    }
  );

export const makeSelectAppMessage = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.get('appMessage').toJS();
    }
  );

export const makeSelectAppDialogOptions = () =>
  createSelector(
    selectGlobal,
    globalState => {
      return globalState.get('appDialogOptions').toJS();
    }
  );
