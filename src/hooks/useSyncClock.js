// React
import { useRef, useEffect } from "react";

// Ours - Reducers
import { useClockReducer, tickClock } from "@/reducers/clockReducer";

// Ours - Hooks
import useInterval from "@/hooks/useInterval";

/**
 * Ensures the latest clock state from the clockReducer every iteration
 *
 * @param {function} callback
 */
export default (callback) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const [state, dispatch] = useClockReducer();
  const { ticks } = state;

  // Runs at least every tick
  useEffect(() => {
    if (savedCallback.current) {
      savedCallback.current(state, dispatch);
    }
  }, [state, ticks, savedCallback, dispatch]);

  // Runs every 20ms
  useInterval(() => {
    dispatch(tickClock());
  }, 20);

  return dispatch;
};
