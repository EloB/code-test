import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ParallelogramCircle } from '../../components';
import { About, Settings } from '../';
import IconButton from 'material-ui/IconButton';
import IconRenew from 'material-ui/svg-icons/action/autorenew';

import './style.less';

const icon = <IconRenew />;
const App = ({ points, handleAddPoint, handleUpdatedPoints, handleReset }) => (
  <div className="app">
    <div className="app__actions">
      <IconButton
        onTouchTap={handleReset}
        children={icon}
        tooltip="Reset"
        tooltipPosition="bottom-left"
      />
      <Settings />
      <About />
    </div>
    <ParallelogramCircle
      points={points}
      onAddPoint={handleAddPoint}
      onUpdatedPoints={handleUpdatedPoints}
    />
  </div>
);
App.propTypes = {
  points: PropTypes.array,
  handleAddPoint: PropTypes.func,
  handleUpdatedPoints: PropTypes.func,
  handleReset: PropTypes.func,
};

export default connect(
  ({ points }) => ({ points }),
  dispatch => ({
    handleAddPoint({ x, y }) {
      dispatch({
        type: 'ADD_POINT',
        x,
        y,
      });
    },
    handleUpdatedPoints(points) {
      dispatch({
        type: 'SET_POINTS',
        points,
      });
    },
    handleReset() {
      dispatch({
        type: 'RESET',
      });
    },
  })
)(App);
