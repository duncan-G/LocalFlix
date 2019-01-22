import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from './history';
import appReducer from './containers/App/reducer';
import loginReducer from './containers/Login/reducer';
import moviesReducer from './containers/Movies/reducer';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    app: appReducer,
    login: loginReducer,
    movies: moviesReducer,
    ...injectedReducers
  });

  return rootReducer;
}
