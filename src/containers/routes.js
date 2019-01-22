import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute, UnprotectedRoute } from './Wrappers';
import { Login, Movies, WatchMovie, Toolbar } from './index';

const Content = ({ classes }) => {
  return (
    <React.Fragment>
      <Toolbar />
      <div className={classes.toolbar} />
      <div className={classes.wrapper}>
        <Switch>
          <Route exact path="/" component={Movies} />
          <Route path="/:movie" component={WatchMovie} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

const styles = theme => ({
  toolbar: { ...theme.mixins.toolbar },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: '24px 0',
    marginBottom: '24px'
  }
});

const StyledContent = withStyles(styles, { withTheme: true })(Content);

const Routes = () => {
  return (
    <Switch>
      <UnprotectedRoute path="/login" component={Login} />
      <ProtectedRoute path="/" component={StyledContent} />
    </Switch>
  );
};

export default Routes;
