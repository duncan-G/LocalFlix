import { createSelector } from 'reselect';

export const selectMovies = state => state.get('movies');

export const makeSelectMovies = () =>
  createSelector(
    selectMovies,
    movieState => {
      return movieState.get('movies').toJS();
    }
  );

export const makeSelectMovie = movieId =>
  createSelector(
    selectMovies,
    movieState => {
      const movie = movieState
        .get('movies')
        .find(movieMap => movieMap.get('id') === +movieId);
      return movie ? movie.toJS() : 'Not Found';
    }
  );

export const makeSelectMoviesLoaded = () =>
  createSelector(
    selectMovies,
    movieState => {
      return movieState.get('movies').size > 0;
    }
  );
