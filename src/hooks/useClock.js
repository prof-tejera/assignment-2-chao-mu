import { useReducer } from "react";

const initialState = {
  startedAt: null,
  transpired: 0,
  paused: true,
  target: 0,
  transpiredAtPause: 0,
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case "resume": {
      return {
        ...state,
        startedAt: Date.now(),
        paused: false,
      };
    }
    case "pause": {
      return {
        ...state,
        transpiredAtPause: state.transpired,
        paused: true,
      };
    }
    case "reset": {
      return { ...initialState, target: state.target };
    }
    case "end": {
      return {
        ...state,
        transpired: state.target,
        paused: true,
      };
    }
    case "setTarget": {
      return {
        ...initialState,
        target: action.target,
      };
    }
    case "tick": {
      if (state.paused) {
        return state;
      }

      const transpired = Math.min(
        state.target,
        state.transpiredAtPause + Date.now() - state.startedAt,
      );

      return {
        ...state,
        transpired,
        paused: state.target === transpired,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const makeEffect = (dispatch) => () => {
  const intervalId = setInterval(() => {
    dispatch({ type: "tick" });
  }, 20);

  return () => clearInterval(intervalId);
};

export const useClock = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  return [state, dispatch, makeEffect(dispatch)];
};
