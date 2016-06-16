import React, { PropTypes } from 'react';
import './style.less';

const CssCircle = ({ points }) => {
  const [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }] = points;
  const angle = Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y1 - y2, x1 - x2);
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const width = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
  const height = Math.abs(Math.sin(angle) * length);
  const diameter = 2 * Math.sqrt((width * height) / Math.PI);
  const x = (x1 + x3) / 2;
  const y = (y1 + y3) / 2;
  return (
    <div
      className="css-circle"
      style={{
        width: diameter,
        height: diameter,
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  );
};
CssCircle.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  })),
};

export default CssCircle;
