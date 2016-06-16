export default (state, action) => {
  switch (action.type) {
    case 'ADD_POINT':
      return {
        ...state,
        points: state.points.concat(action.point),
      };
    case 'MOVE_POINT': {
      const points = state.points.slice();
      points[action.index] = {
        ...points[action.index],
        ...action.point,
      };
      return {
        ...state,
        points,
      };
    }
    case 'SET_POINTS':
      return {
        ...state,
        points: action.points,
      };
    case 'START_DND':
      return {
        ...state,
        dragging: true,
      };
    case 'STOP_DND':
      return {
        ...state,
        dragging: false,
      };
    default:
      return state;
  }
};
