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
  if (action.type !== ClockActionType.TICK) console.log("clockReducer", action);

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
    case ClockActionType.TICK: {
      if (state.paused) {
        return state;
      }

      const transpired = state.transpiredAtPause + Date.now() - state.startedAt;
      console.log("BEFORE", state.transpired);
      console.log("TRANSPIRED", transpired);

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
      throw Error("Unknown action received by clockReducer: " + action.type);
    }
  }
};

export const useClock = () => {
  const [{ transpired, paused }, dispatch] = useReducer(
    clockReducer,
    initialState,
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: ClockActionType.TICK });
    }, 20);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    transpired,
    paused,
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
    restartClock: useCallback(() => {
      dispatch({ type: ClockActionType.RESET });
      dispatch({ type: ClockActionType.RESUME });
    }, []),
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
