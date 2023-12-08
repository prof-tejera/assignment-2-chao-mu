// React
import { useState } from "react";

// Ours - Types
import {
  createTimerSnapshot,
  TimerState,
  getTotalDuration,
} from "@/types/timer";

// Ours - Reducers
import {
  useWorkoutPlanReducer,
  nextTimer,
  prevTimer,
  addTimer,
  removeTimer,
  gotoFirstTimer,
} from "@/reducers/workoutPlanReducer";

import {
  restartClock,
  resetClock,
  resumeClock,
  setTranspired,
  pauseClock,
} from "@/reducers/clockReducer";

// Ours - Hokes
import useSyncClock from "@/hooks/useSyncClock";

export default () => {
  const [timerSnapshot, setTimerSnapshot] = useState(null);

  const [{ currentTimerOptions, isLastTimer, plan }, workoutPlanDispatch] =
    useWorkoutPlanReducer();

  const dispatchNextTimer = (clockDispatch) => {
    workoutPlanDispatch(nextTimer());
    clockDispatch(restartClock());
  };

  const dispatchPrevTimer = (clockDispatch) => {
    workoutPlanDispatch(prevTimer());
    clockDispatch(restartClock());
  };

  // Callback is called every tick, whether or not the clock is paused.
  // Transpired only increases when the clock is not paused.
  const clockDispatch = useSyncClock(({ transpired, paused }) => {
    if (currentTimerOptions === null) {
      setTimerSnapshot(null);
      return;
    }

    const updatedSnapshot = createTimerSnapshot({
      transpired,
      active: !paused,
      options: currentTimerOptions,
    });

    setTimerSnapshot(updatedSnapshot);

    const { state: updatedState } = updatedSnapshot.progress;

    // Move on to the next if there is another one to move on to
    if (updatedState === TimerState.COMPLETED && !isLastTimer) {
      dispatchNextTimer(clockDispatch);
    }
  });

  return {
    plan,
    timerSnapshot,
    restartTimer: () => {
      clockDispatch(restartClock());
    },
    pauseWorkout: () => {
      clockDispatch(pauseClock());
    },
    resumeWorkout: () => {
      clockDispatch(resumeClock());
    },
    resetTimer: () => {
      clockDispatch(resetClock());
    },
    fastForwardTimer: () => {
      if (currentTimerOptions === null) {
        return;
      }

      clockDispatch(
        setTranspired({
          transpired: getTotalDuration(timerSnapshot.options),
        }),
      );
    },
    fastBackwardTimer: () => {
      dispatchPrevTimer(clockDispatch);
    },
    resetWorkout: () => {
      workoutPlanDispatch(gotoFirstTimer());
      clockDispatch(resetClock());
    },
    removeTimer: (id) => {
      workoutPlanDispatch(removeTimer({ id }));
    },
    addTimer: (options) => {
      workoutPlanDispatch(addTimer({ options }));
    },
  };
};
