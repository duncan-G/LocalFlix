import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DefaultSnackbar from '../../components/Snackbars/DefaultSnackbar';
import { makeSelectAppMessage } from './selectors';
import { resolveAppMessage } from './actions';

const AppSnackbar = props => {
  return (
    <DefaultSnackbar
      appMessage={props.appMessage}
      resolveAppMessage={props.resolveAppMessage}
    />
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    appMessage: makeSelectAppMessage()
  });

const mapDistpatchToProps = dispatch => ({
  resolveAppMessage: () => dispatch(resolveAppMessage())
});

AppSnackbar.propTypes = {
  appMessage: PropTypes.object.isRequired,
  resolveAppMessage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDistpatchToProps
)(AppSnackbar);
