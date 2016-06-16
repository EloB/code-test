const defaultState = {
  points: [],
  point: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_POINT': {
      const id = state.points.length;
      if (state.points.length > 2) {
        return state;
      }
      return {
        ...state,
        points: state.points.concat(id),
        point: {
          ...state.point,
          [id]: {
            ...state.point[id],
            x: action.x,
            y: action.y,
            dragging: false,
          },
        },
      };
    }
    case 'START_DRAG_POINT':
      return {
        ...state,
        point: {
          ...state.point,
          [action.id]: {
            ...state.point[action.id],
            dragging: true,
          },
        },
      };
    case 'STOP_DRAG_POINT':
      return {
        ...state,
        point: {
          ...state.point,
          [action.id]: {
            ...state.point[action.id],
            dragging: false,
          },
        },
      };
    case 'MOVE_POINT':
      return {
        ...state,
        point: {
          ...state.point,
          [action.id]: {
            ...state.point[action.id],
            x: action.x,
            y: action.y,
          },
        },
      };
    case 'RESET':
      return defaultState;
    default:
      return state;
  }
};
