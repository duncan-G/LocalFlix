import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import dataLoader, { LoaderFn } from '../../utils/dataLoader';
import history from '../../history';

import { withTransition } from '../Wrappers';
import { makeSelectMovies, makeSelectMoviesLoaded } from './selectors';
import { fetchMovies } from './actions';
import Movie from './MovieCard';

import './Movies.css';

const Movies = props => {
  const goTo = movideId => history.push('/' + movideId);
  return (
    <div className="movieWrapper">
      {props.movies.map(movie => (
        <Movie key={movie.id} movie={movie} handleClick={goTo} />
      ))}
    </div>
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    movies: makeSelectMovies()
  });

const withConnect = connect(mapStateToProps);

const loaders = [new LoaderFn('movies', fetchMovies, makeSelectMoviesLoaded)];

const withData = dataLoader(loaders);

export default compose(
  withData,
  withConnect,
  withTransition
)(Movies);
