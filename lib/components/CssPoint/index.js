import React, { PropTypes } from 'react';
import EventListener from 'react-event-listener';
import { compose, withState, withHandlers } from 'recompose';
import classnames from 'classnames';
import './style.less';

const handleDragStart = e => e.preventDefault();
const hasTouch = ('ontouchstart' in window);

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
    className={classnames({
      'css-point': true,
      'css-point--touch': hasTouch
    })}
    style={{ transform: `translate(${x}px, ${y}px)` }}
  >
    {dragging &&
      <EventListener
        target={window}
        {...{
          [hasTouch ? 'onTouchMove' : 'onMouseMove']: handleMouseMove,
          [hasTouch ? 'onTouchEnd' : 'onMouseUp']: handleMouseUp,
        }}
      />
    }
    <div
      className="css-point__circle"
      onDragStart={handleDragStart}
      {...{
        [hasTouch ? 'onTouchStart' : 'onMouseDown']: handleMouseDown,
      }}
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

// @TODO Needs refactor with better naming conversion to also support touch
export default compose(
  withState('dragging', 'setDragging', false),
  withHandlers({
    handleMouseDown: ({ onDnDStart, setDragging }) => e => {
      e.preventDefault();
      if (hasTouch && e.touches.length > 1) return;
      setDragging(true);
      if (onDnDStart) onDnDStart();
    },
    handleMouseUp: ({ onDnDStop, setDragging }) => e => {
      if (hasTouch && e.touches.length) return;
      setDragging(false);
      if (onDnDStop) onDnDStop();
    },
    handleMouseMove: ({ onPositionChange }) => e => {
      if (onPositionChange) {
        const { clientX: x, clientY: y } = hasTouch ? e.touches[0] : e;
        onPositionChange({ x, y });
      }
    },
  })
)(CssPoint);
