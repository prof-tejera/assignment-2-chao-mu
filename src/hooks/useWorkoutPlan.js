// React
import { useReducer, useCallback } from "react";

/**
 * @typedef {Object} WorkoutPlanState
 * @property {import("@/types/timer").TimerOptions[]} plan
 * @property {number} cursor
 */

/**
 * @enum {string}
 * @readonly
 */
const WorkoutPlanActionType = {
  ADD_TIMER: "addTimer",
  REMOVE_TIMER: "removeTimer",
  NEXT_TIMER: "nextTimer",
  PREV_TIMER: "prevTimer",
  GOTO_FIRST_TIMER: "gotoFirstTimer",
};

/**
 * @type {WorkoutPlanState}
 */
const initialState = {
  plan: [],
  cursor: 0,
};

/**
 * @param {WorkoutPlanState} state
 * @param {Object} action
 * @param {WorkoutPlanActionType} action.type
 * @param {any} [action.payload]
 */

const workoutReducer = (state, action) => {
  console.log("workoutReducer", action);
  switch (action.type) {
    case WorkoutPlanActionType.ADD_TIMER: {
      const { options } = action.payload;
      const plan = [...state.plan, options];

      return { ...state, plan };
    }
    case WorkoutPlanActionType.REMOVE_TIMER: {
      const { id } = action.payload;
      const index = state.plan.findIndex((timer) => timer.id === id);
      const cursor = state.cursor > index ? state.cursor - 1 : state.cursor;
      const plan = [
        ...state.plan.slice(0, index),
        ...state.plan.slice(index + 1),
      ];

      return { ...state, plan, cursor };
    }
    case WorkoutPlanActionType.NEXT_TIMER: {
      return {
        ...state,
        cursor: Math.min(state.cursor + 1, state.plan.length - 1),
      };
    }
    case WorkoutPlanActionType.PREV_TIMER: {
      return {
        ...state,
        cursor: Math.max(state.cursor - 1, 0),
      };
    }
    case WorkoutPlanActionType.GOTO_FIRST_TIMER: {
      return {
        ...state,
        cursor: 0,
      };
    }
    default: {
      throw Error("Unknown action received by clockReducer: " + action.type);
    }
  }
};

export const useWorkoutPlan = () => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  /**
   * Add a timer to the plan given timer options
   *
   * @param {Object} params
   * @param {import('@/types/timer').TimerOptions} params.options
   */
  const addTimer = ({ options }) => {
    dispatch({
      type: WorkoutPlanActionType.ADD_TIMER,
      payload: { options },
    });
  };

  /**
   * Remove a timer from the plan by id
   *
   * @param {Object} params
   * @param {string} params.id
   */
  const removeTimer = ({ id }) => {
    dispatch({
      type: WorkoutPlanActionType.REMOVE_TIMER,
      payload: { id },
    });
  };

  const { plan, cursor } = state;
  const isLastTimer = cursor >= plan.length - 1;
  const isFirstTimer = cursor <= 0;

  const currentTimerOptions = plan[cursor] || null;

  return {
    plan,
    currentTimerOptions,
    isLastTimer,
    isFirstTimer,
    addTimer: useCallback(addTimer, []),
    removeTimer: useCallback(removeTimer, []),
    nextTimer: useCallback(
      () => dispatch({ type: WorkoutPlanActionType.NEXT_TIMER }),
      [],
    ),
    prevTimer: useCallback(
      () => dispatch({ type: WorkoutPlanActionType.PREV_TIMER }),
      [],
    ),
    gotoFirstTimer: useCallback(
      () => dispatch({ type: WorkoutPlanActionType.GOTO_FIRST_TIMER }),
      [],
    ),
  };
};
