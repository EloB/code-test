import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import EventListener from 'react-event-listener';
import './style.less';

const Point = ({ x, y, dragging, handleMouseDown, handleMouseUp, handleMouseMove }) => (
  <div
    className="point"
    style={{ transform: `translate(${x}px, ${y}px)` }}
    onMouseDown={handleMouseDown}
  >
    {dragging &&
      <EventListener target={window} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} />
    }
  </div>
);
Point.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dragging: PropTypes.bool,
  handleMouseDown: PropTypes.func,
  handleMouseUp: PropTypes.func,
  handleMouseMove: PropTypes.func,
};

export default connect(
  ({ point }, { id }) => point[id],
  (dispatch, { id }) => ({
    handleMouseDown() {
      dispatch({
        type: 'START_DRAG_POINT',
        id,
      });
    },
    handleMouseUp() {
      dispatch({
        type: 'STOP_DRAG_POINT',
        id,
      });
    },
    handleMouseMove(e) {
      dispatch({
        type: 'MOVE_POINT',
        id,
        x: e.clientX,
        y: e.clientY,
      });
    },
  })
)(Point);
