import React, { PropTypes } from 'react';
import EventListener from 'react-event-listener';
import { pure } from 'recompose';
import './style.less';

const { abs, sin, cos, pow, sqrt, atan2, PI } = Math;
const toDegree = 180 / PI;
const deg180 = 180 * PI / 180;

const CssParallelogram = ({
  points,
  dragging,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}) => {
  const [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }] = points;
  const angle = atan2(y3 - y2, x3 - x2) - atan2(y1 - y2, x1 - x2);
  const length = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
  const width = sqrt(pow(x2 - x3, 2) + pow(y2 - y3, 2));
  const height = abs(sin(angle) * length);
  const rotate = atan2(y2 - y3, x2 - x3) * toDegree;
  const skew = 90 + angle * toDegree;
  const l = sqrt(pow(x1 - x3, 2) + pow(y1 - y3, 2)) / 2;
  const a = atan2(y1 - y3, x1 - x3);
  let dx;
  let dy;
  if ((angle < 0 && angle > -deg180) || angle > deg180) {
    const b = atan2(y1 - y2, x1 - x2);
    dx = length * cos(b);
    dy = length * sin(b);
  } else {
    dx = dy = 0;
  }

  const x = (x1 + x3) / 2 - l * cos(a) + dx;
  const y = (y1 + y3) / 2 - l * sin(a) + dy;
  return (
    <div
      className="css-parallelogram"
      style={{
        width,
        height,
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) skew(${skew}deg)`,
      }}
      onMouseDown={onMouseDown}
    >
      {dragging &&
        <EventListener target={window} onMouseMove={onMouseMove} onMouseUp={onMouseUp} />
      }
    </div>
  );
};
CssParallelogram.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  })),
  dragging: PropTypes.bool,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseMove: PropTypes.func,
};

export default pure(CssParallelogram);
