import React, { PropTypes } from 'react';
import EventListener from 'react-event-listener';
import { compose, withState, withHandlers } from 'recompose';
import './style.less';

const handleDragStart = e => e.preventDefault();

const CssPoint = ({
  x,
  y,
  dragging,
  handleMouseDown,
  handleMouseUp,
  handleMouseMove,
  showCoordinates,
}) => (
  <div
    className="css-point"
    style={{ transform: `translate(${x}px, ${y}px)` }}
  >
    {dragging &&
      <EventListener target={window} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} />
    }
    <div
      className="css-point__circle"
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
    />
  {showCoordinates &&
    <div className="css-point__label">
      ({x}, {y})
    </div>
  }
  </div>
);
CssPoint.propTypes = {
  showCoordinates: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  disabled: PropTypes.bool,
  dragging: PropTypes.bool,
  handleMouseDown: PropTypes.func,
  handleMouseUp: PropTypes.func,
  handleMouseMove: PropTypes.func,
  onPositionChange: PropTypes.func,
  onDnDStart: PropTypes.func,
  onDnDStop: PropTypes.func,
};

export default compose(
  withState('dragging', 'setDragging', false),
  withHandlers({
    handleMouseDown: ({ onDnDStart, setDragging }) => () => {
      setDragging(true);
      if (onDnDStart) onDnDStart();
    },
    handleMouseUp: ({ onDnDStop, setDragging }) => () => {
      setDragging(false);
      if (onDnDStop) onDnDStop();
    },
    handleMouseMove: ({ onPositionChange }) => ({ clientX: x, clientY: y }) => {
      if (onPositionChange) onPositionChange({ x, y });
    },
  })
)(CssPoint);
