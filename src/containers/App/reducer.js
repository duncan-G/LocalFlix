import { fromJS } from 'immutable';
import * as types from './constants';

const initalState = fromJS({
  appLoading: false, // Global loading indicator
  appMessage: defaultAppMessage(), // Global snackbar messages
  appDialogOptions: defaultAppDialogOptions(), // Global dialog
  currentUser: false
});

const reducer = (state = initalState, action) => {
  switch (action.type) {
    // Logged in user
    case types.ADD_USER:
      return state.set('currentUser', fromJS(action.currentUser));
    case types.REMOVE_CURRENT_USER:
      return state.set('currentUser', false);

    // App snackbar
    case types.APP_MESSAGE:
      return state.set('appMessage', fromJS(action.messageOptions));
    case types.RESOLVE_APP_MESSAGE:
      return state.set('appMessage', defaultAppMessage());

    // App loading indicator
    case types.APP_RESOURCE_LOADING:
      return state.set('appLoading', true);
    case types.APP_RESOURCE_LOADING_COMPLETE:
      return state.set('appLoading', false);

    // App dialog
    case types.OPEN_APP_DIALOG:
      return state.set(
        'appDialogOptions',
        setDialogOptions(action.appDialogOptions)
      );
    case types.CLOSE_APP_DIALOG:
      return state.setIn(['appDialogOptions', 'open'], false);
    case types.RESET_APP_DIALOG:
      return state.set('appDialogOptions', defaultAppDialogOptions());

    default:
      return state;
  }
};

/* utils */

function defaultAppMessage() {
  return fromJS({
    message: '',
    icon: '',
    type: ''
  });
}

function defaultAppDialogOptions() {
  return fromJS({
    open: false,
    title: '',
    contentText: '',
    width: 'md',
    handleClose: null,
    renderContent: null,
    renderActions: null
  });
}

function setDialogOptions(dialogOptions) {
  const options = defaultAppDialogOptions;
  for (let option in options) {
    if (options.hasOwnProperty(option)) {
      const newValue = dialogOptions[option]
        ? dialogOptions[option]
        : options[option];
      options.set(option, newValue);
    }
  }
  return options;
}
export default reducer;
