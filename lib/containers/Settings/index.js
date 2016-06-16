import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconSettings from 'material-ui/svg-icons/action/settings';
import { compose, withState, withHandlers } from 'recompose';

const icon = <IconSettings />;

function noop() {}

const Settings = ({ handleOpen, handleRequestClose, open }) => (
  <div className="settings">
    <IconButton
      onTouchTap={handleOpen}
      children={icon}
      tooltip="Settings"
      tooltipPosition="bottom-left"
    />
    <Dialog
      title="Settings"
      open={open}
      onRequestClose={handleRequestClose}
      actions={[
        <FlatButton key={0} label="Cancel" primary onTouchTap={handleRequestClose} />,
        <FlatButton key={1} label="Ok" primary onTouchTap={handleRequestClose} />,
      ]}
    >
      <SelectField floatingLabelText="Rendering type" value="css" onChange={noop}>
        <MenuItem value="css" primaryText="Css" />
        <MenuItem value="svg" primaryText="Svg" disabled />
        <MenuItem value="canvas" primaryText="Canvas" disabled />
      </SelectField>
    </Dialog>
  </div>
);
Settings.propTypes = {
  handleOpen: PropTypes.func,
  handleRequestClose: PropTypes.func,
  open: PropTypes.bool,
};

export default compose(
  withState('open', 'setOpen', false),
  withHandlers({
    handleOpen: ({ open, setOpen }) => () => setOpen(!open),
    handleRequestClose: ({ setOpen }) => () => setOpen(false),
  }),
)(Settings);
