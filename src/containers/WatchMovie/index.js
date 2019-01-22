import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ReactPlayer from 'react-player';
import { createStructuredSelector } from 'reselect';

import dataLoader, { LoaderFn } from '../../utils/dataLoader';
import { makeSelectMovie, makeSelectMoviesLoaded } from '../Movies/selectors';
import { fetchMovies } from '../Movies/actions';
import { Page404 } from '../../components/Pages';

import './WatchMovie.css';

class WatchMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  mockUrl() {
    return Math.random() > 0.5
      ? 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
      : process.env.REACT_APP_SERVER_URL + 'media/movies/big_buck_bunny.mp4';
  }
  render() {
    console.log(this.props);
    if (this.props.movie === 'Not Found') {
      return <Page404 />;
    } else {
      return (
        <div className="movieWrapper">
          <div className="movie">
            <h1>{this.props.movie.name} The Movie </h1>
            <ReactPlayer
              url={this.mockUrl()}
              controls={true}
            />
          </div>
        </div>
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
