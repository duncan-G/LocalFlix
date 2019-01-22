import * as types from './constants';
import history from '../../history';

/*  Action creators */

export const addUser = currentUser => ({
  type: types.ADD_USER,
  currentUser
});

export const removeCurrentUser = () => ({
  type: types.REMOVE_CURRENT_USER
});

export const resourceLoading = () => ({
  type: types.APP_RESOURCE_LOADING
});

export const resourceLoadingComplete = () => ({
  type: types.APP_RESOURCE_LOADING_COMPLETE
});

export const appMessage = messageOptions => ({
  type: types.APP_MESSAGE,
  messageOptions
});

export const resolveAppMessage = () => ({
  type: types.RESOLVE_APP_MESSAGE
});

export const openAppDialog = dialogOptions => ({
  type: types.OPEN_APP_DIALOG,
  dialogOptions
});

export const closeAppDialog = () => ({
  type: types.CLOSE_APP_DIALOG
});

export const resetAppDialog = () => ({
  type: types.RESET_APP_DIALOG
});

/* Thunk creators */

export const getUser = () => dispatch => {
  return fetch('/auth/me')
    .then(response => {
      return response.json();
    })
    .then(result => {
      if (!result.error) {
        dispatch(addUser(result.data));
      }
    });
};

export const logout = () => dispatch => {
  dispatch(resourceLoading());

  return fetch('/auth/logout', { method: 'POST' })
    .then(response => {
      return response.json();
    })
    .then(result => {
      if (result.error) {
        const messageOptions = errorMessage(result.error);
        dispatch(appMessage(messageOptions));
      } else {
        dispatch(removeCurrentUser());
        history.push('/login');
      }
    })
    .catch(error => {
      dispatch(appMessage(error.message));
    })
    .finally(() => {
      dispatch(resourceLoadingComplete());
    });
};

/* utils */
export function errorMessage(error) {
  return {
    message: error.message,
    icon: 'error',
    type: 'error'
  };
}
