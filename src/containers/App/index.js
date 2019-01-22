import React from 'react';
import Routes from '../routes';

import { getUser } from './actions';
import dataLoader, { LoaderFn } from '../../utils/dataLoader';
import { makeSelectUserLoaded } from './selectors';

import ResourceLoading from './ResourceLoading';
import AppDialog from './AppDialog';
import AppSnackbar from './AppSnackbar';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <ResourceLoading />
      <Routes />
      <AppDialog />
      <AppSnackbar />
    </div>
  );
};

const loaders = [new LoaderFn('currentUser', getUser, makeSelectUserLoaded)];

const withData = dataLoader(loaders);

export default withData(App);
