import * as types from './constants';
import {
  appMessage,
  errorMessage,
  resourceLoading,
  resourceLoadingComplete
} from '../App/actions';

/* action creators */
export const initMovies = movies => ({
  type: types.INIT_MOVIES,
  movies
});

export const addMovie = movie => ({
  type: types.ADD_MOVIE,
  movie
});

export const uploadMovieError = uploadError => ({
  type: types.UPLOAD_MOVIE_ERROR,
  uploadError
});

export const resolveUploadMovieError = () => ({
  type: types.RESOLVE_UPLOAD_MOVIE_ERROR
});

export const removeMovie = movieId => ({
  type: types.REMOVE_MOVIE,
  movieId
});

/* thunk creators */
export const fetchMovies = () => {
  return dispatch => {
    dispatch(resourceLoading());
    fetch('/api/movies')
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          const messageOptions = errorMessage(result.error);
          dispatch(appMessage(messageOptions));
        } else {
          dispatch(initMovies(result.data));
        }
      })
      .catch(error => {
        const messageOptions = errorMessage(error);
        dispatch(appMessage(messageOptions));
      })
      .finally(() => {
        dispatch(resourceLoadingComplete());
      });
  };
};

export const deleteMovie = movieId => {
  return dispatch => {
    dispatch(resourceLoading());
    fetch('/api/movies/' + movieId, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          const messageOptions = errorMessage(result.error);
          dispatch(appMessage(messageOptions));
        } else {
          dispatch(removeMovie(movieId));
        }
      })
      .catch(error => {
        const messageOptions = errorMessage(error);
        dispatch(appMessage(messageOptions));
      })
      .finally(() => {
        dispatch(resourceLoadingComplete());
      });
  };
};

export const uploadMovie = movieFile => {
  return dispatch => {
    dispatch(resourceLoading());
    dispatch(resolveUploadMovieError());
    let body = new FormData();
    body.append('movieFile', movieFile);

    fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          dispatch(uploadMovieError(result.error.message));
        } else {
          dispatch(addMovie(result.data));
        }
      })
      .catch(error => {
        const messageOptions = errorMessage(error);
        dispatch(appMessage(messageOptions));
      })
      .finally(() => {
        dispatch(resourceLoadingComplete());
      });
  };
};
