const defaultState = {
  points: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_POINT':
      if (state.points.length > 2) {
        return state;
      }
      return {
        ...state,
        points: state.points.concat({ x: action.x, y: action.y }),
      };
    case 'SET_POINTS':
      return {
        ...state,
        points: action.points,
      };
    case 'RESET':
      return defaultState;
    default:
      return state;
  }
};
