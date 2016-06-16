import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Point } from '../';
import './style.less';

export const App = ({ points, handleClick, handleButtonClick }) => (
  <div
    className="app"
    onClick={handleClick}
  >
    <button onClick={handleButtonClick}>Reset</button>
    {points.map(point => <Point key={point} id={point} />)}
  </div>
);
App.propTypes = {
  points: PropTypes.array,
  handleClick: PropTypes.func,
  handleButtonClick: PropTypes.func,
};

export default connect(
  ({ points }) => ({ points }),
  dispatch => ({
    handleClick(e) {
      dispatch({
        type: 'ADD_POINT',
        x: e.clientX,
        y: e.clientY,
      });
    },
    handleButtonClick(e) {
      e.stopPropagation();
      dispatch({
        type: 'RESET',
      });
    },
  })
)(App);
