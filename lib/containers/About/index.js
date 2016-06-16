import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconInfo from 'material-ui/svg-icons/action/info';
import Toggle from 'material-ui/Toggle';
import { compose, withState, withHandlers } from 'recompose';

const SHOW_ABOUT_ON_STARTUP = 'showAboutOnStartup';
const icon = <IconInfo />;

let showAboutOnStartup = JSON.parse(global.localStorage.getItem(SHOW_ABOUT_ON_STARTUP) || 'true');

const About = ({ handleOpen, handleRequestClose, handleToggle, open }) => (
  <div className="about">
    <div className="about__reset">
      <IconButton
        onTouchTap={handleOpen}
        children={icon}
        tooltip="About"
        tooltipPosition="bottom-left"
      />
    </div>
    <Dialog
      title="About"
      open={open}
      onRequestClose={handleRequestClose}
      actions={<FlatButton label="Ok" onTouchTap={handleRequestClose} />}
    >
      <p>
        Click anywhere on the screen to add a point. After three points are added then
        two additional shapes will be visible (parallelogram and circles).
      </p>
      <p>
        Target your mouse over a point and then hold down the left mouse button
        to drag the points around.
      </p>
      <p>
        Click the reset button to restart the program.
      </p>
      <Toggle
        label="Show this dialog on startup"
        defaultToggled={showAboutOnStartup}
        onToggle={handleToggle}
      />
    </Dialog>
  </div>
);
About.propTypes = {
  handleOpen: PropTypes.func,
  handleRequestClose: PropTypes.func,
  handleToggle: PropTypes.func,
  open: PropTypes.bool,
};

export default compose(
  withState('open', 'setOpen', showAboutOnStartup),
  withHandlers({
    handleOpen: ({ open, setOpen }) => () => setOpen(!open),
    handleRequestClose: ({ setOpen }) => () => setOpen(false),
    handleToggle: () => () => {
      global.localStorage.setItem(SHOW_ABOUT_ON_STARTUP, JSON.stringify(!showAboutOnStartup));
    },
  }),
)(About);
