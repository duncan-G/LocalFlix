import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { makeSelectCurrentUser } from '../App/selectors';
import { logout } from '../App/actions';

import styles from './styles';
import { Typography } from '@material-ui/core';

const AppToolbar = props => {
  const { classes } = props;

  const handleLogout = event => {
    event.preventDefault();
    props.logout();
  };
  return (
    <AppBar position="fixed" className={classes.appBar} color="default">
      <Toolbar disableGutters>
        <img src="/images/logo.svg" className={classes.logo} alt="LOCALFLIX" />
        <Link to="/" className={classes.title}>
          <h2>LOCALFLIX</h2>
        </Link>
        <div className={classes.toolbarContent}>
          <Typography variant="subtitle1" color="textSecondary">
            Hello {props.user.firstName}
          </Typography>
        </div>
        <IconButton onClick={handleLogout}>
          <PowerSettingsNewIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = () =>
  createStructuredSelector({
    user: makeSelectCurrentUser()
  });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AppToolbar));
