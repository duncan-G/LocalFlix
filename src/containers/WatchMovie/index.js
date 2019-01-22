import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ReactPlayer from 'react-player';
import { createStructuredSelector } from 'reselect';

import dataLoader, { LoaderFn } from '../../utils/dataLoader';
import { makeSelectMovie, makeSelectMoviesLoaded } from '../Movies/selectors';
import { fetchMovies } from '../Movies/actions';
import { Page404 } from '../../components/Pages';

class WatchMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    console.log(this.props);
    if (this.props.movie === 'Not Found') {
      return <Page404 />;
    } else {
      return (
        <ReactPlayer
          url={process.env.REACT_APP_SERVER_URL + this.props.movie.mediaUrl}
        />
      );
    }
  }
}

const mapStateToProps = (_, ownProps) =>
  createStructuredSelector({
    movie: makeSelectMovie(ownProps.match.params.movie)
  });

const withConnect = connect(mapStateToProps);

const loaders = [new LoaderFn('movies', fetchMovies, makeSelectMoviesLoaded)];

const withData = dataLoader(loaders);

export default compose(
  withData,
  withConnect
)(WatchMovie);
