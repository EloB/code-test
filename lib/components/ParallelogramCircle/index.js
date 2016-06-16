import React, { PropTypes } from 'react';
import { CssPoint, CssParallelogram, CssCircle, SvgPoint, SvgParallelogram, SvgCircle } from '../';
import { compose, withReducer, withHandlers, lifecycle } from 'recompose';
import stateReducer from './reducer';
import './style.less';

const components = { CssPoint, CssParallelogram, CssCircle, SvgPoint, SvgParallelogram, SvgCircle };
const renderingTypes = { css: 'Css', svg: 'Svg' };

const ParallelogramCircle = ({
  rendering = 'css',
  handleTouchTap,
  state: { points },
  ...events,
}) => {
  const Component = rendering === 'css' ? 'div' : rendering;
  const hasThreePoints = points.length === 3;
  const type = renderingTypes[rendering];
  const Point = components[`${type}Point`];
  const Parallelogram = components[`${type}Parallelogram`];
  const Circle = components[`${type}Circle`];
  return (
    <Component
      className="parallelogram-circle"
      onTouchTap={handleTouchTap}
    >
      {points.map((point, index) => (
        <Point
          {...point}
          showCoordinates
          onDnDStart={events.handleDndStart}
          onDnDStop={events.handleDndStop}
          onPositionChange={events[`handlePositionChange${index}`]}
          key={index}
        />
      ))}
      {hasThreePoints && <Parallelogram points={points} />}
      {hasThreePoints && <Circle points={points} />}
    </Component>
  );
};
ParallelogramCircle.propTypes = {
  rendering: PropTypes.oneOf(Object.keys(renderingTypes)),
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  })),
  onAddPoint: PropTypes.func,
  handleTouchTap: PropTypes.func,
  state: PropTypes.shape({
    points: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })),
  }),
};

export default compose(
  withReducer('state', 'setState', stateReducer, ({
    points = [],
    dragging = false,
  }) => ({ points, dragging })),
  lifecycle({
    componentWillReceiveProps({ setState, points, state: { dragging } }) {
      if (!dragging && points && this.props.state.points !== points) {
        setState({
          type: 'SET_POINTS',
          points,
        });
      }
    },
  }),
  withHandlers({
    handleTouchTap:
      ({ onAddPoint, setState, state: { points } }) =>
      ({ nativeEvent: { clientX: x, clientY: y } }) => {
        if (points.length < 3) {
          const point = { x, y };
          setState({
            type: 'ADD_POINT',
            point,
          });
          if (onAddPoint) {
            onAddPoint(point);
          }
        }
      },
    handleDndStart: ({ setState }) => () => setState({ type: 'START_DND' }),
    handleDndStop: ({ setState, onUpdatedPoints, state: { points } }) => () => {
      if (onUpdatedPoints) onUpdatedPoints(points);
      setState({ type: 'STOP_DND' });
    },
    ...([0, 1, 2].reduce((obj, index) => {
      obj[`handlePositionChange${index}`] = // eslint-disable-line no-param-reassign
        ({ setState }) => point => {
          setState({
            type: 'MOVE_POINT',
            index,
            point,
          });
        };
      return obj;
    }, {})),
  }),
)(ParallelogramCircle);
