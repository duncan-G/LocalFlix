import * as types from './constants';
import { fromJS } from 'immutable';

const initalState = fromJS({
  movies: [],
  uploadMovieError: false
});

const moviesReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.INIT_MOVIES:
      return state.set('movies', fromJS(action.movies));
    case types.ADD_MOVIE:
      return state.set(
        'movies',
        state.get('movies').unshift(fromJS(action.movie))
      );
    case types.REMOVE_MOVIE:
      return removeMovieFromState(state, action.movieId);
    case types.UPLOAD_MOVIE_ERROR:
      return state.set('uploadMovieError', action.uploadError);
    case types.RESOLVE_UPLOAD_MOVIE_ERROR:
      return state.set('uploadMovieError', false);
    default:
      return state;
  }
};

export default moviesReducer;
/* utils */

function removeMovieFromState(state, movidId) {
  const index = state
    .get('movies')
    .find(movieMap => movieMap.get('id') === movidId);

  return state.splice(index, 1);
}
