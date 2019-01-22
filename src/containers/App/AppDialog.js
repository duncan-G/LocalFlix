import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DefaultDialog from '../../components/Dialogs/DefaultDialog';
import { closeAppDialog } from './actions';
import { makeSelectAppDialogOptions } from './selectors';

const AppDialog = props => {
  return (
    <DefaultDialog
      open={props.dialogOptions.open}
      width={props.dialogOptions.width}
      title={props.dialogOptions.title}
      contentText={props.dialogOptions.contentText}
      handleClose={props.handleDialogClose}
      renderContent={props.dialogOptions.renderContent}
      renderActions={props.dialogOptions.renderActions}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  dialogOptions: makeSelectAppDialogOptions()
});

const mapDispatchToProps = dispatch => ({
  handleDialogClose: () => dispatch(closeAppDialog())
});

AppDialog.propTypes = {
  dialogOptions: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDialog);
