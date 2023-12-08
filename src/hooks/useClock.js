import { useReducer, useCallback, useEffect } from "react";

/**
 * @typedef {object} ClockState
 * @property {number | null} startedAt
 * @property {number} transpired
 * @property {boolean} paused
 * @property {number} transpiredAtPause
 */

/**
 * @enum {string}
 * @readonly
 */
const ClockActionType = {
  RESUME: "resume",
  PAUSE: "pause",
  RESET: "reset",
  RESTART: "restart",
  TICK: "tick",
  SET_TRANSPIRED: "setTranspired",
};

/**
 * @type {ClockState}
 */
const initialState = {
  startedAt: null,
  transpired: 0,
  paused: true,
  transpiredAtPause: 0,
};

/**
 * @param {ClockState} state
 * @param {Object} action
 * @param {ClockActionType} action.type
 * @param {any} [action.payload]
 */
const clockReducer = (state, action) => {
  switch (action.type) {
    case ClockActionType.RESUME: {
      return {
        ...state,
        startedAt: Date.now(),
        paused: false,
      };
    }
    case ClockActionType.PAUSE: {
      return {
        ...state,
        transpiredAtPause: state.transpired,
        paused: true,
      };
    }
    case ClockActionType.RESET: {
      return { ...initialState };
    }
    case ClockActionType.RESTART: {
      return {
        ...initialState,
        paused: false,
      };
    }
    case ClockActionType.TICK: {
      if (state.paused) {
        return state;
      }

      const transpired = state.transpiredAtPause + Date.now() - state.startedAt;

      return {
        ...state,
        transpired,
      };
    }
    case ClockActionType.SET_TRANSPIRED: {
      const transpired = action.payload.transpired;

      return {
        ...state,
        transpired,
        transpiredAtPause: transpired,
        paused: true,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const useClock = () => {
  const [state, dispatch] = useReducer(clockReducer, initialState);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: ClockActionType.TICK });
    }, 20);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    ...state,
    resumeClock: useCallback(
      () => dispatch({ type: ClockActionType.RESUME }),
      [],
    ),
    pauseClock: useCallback(
      () => dispatch({ type: ClockActionType.PAUSE }),
      [],
    ),
    resetClock: useCallback(
      () => dispatch({ type: ClockActionType.RESET }),
      [],
    ),
    restartClock: useCallback(
      () => dispatch({ type: ClockActionType.RESTART }),
      [],
    ),
    setTranspired: useCallback(
      (newTranspired) =>
        dispatch({
          type: ClockActionType.SET_TRANSPIRED,
          payload: {
            transpired: newTranspired,
          },
        }),
      [],
    ),
  };
};
