import { useEffect, useState } from "react";

import {
  getTotalDuration,
  TimerState,
  createTimerSnapshot,
} from "@/types/timer";

import { useClock } from "@/hooks/useClock";
import { useWorkoutPlan } from "@/hooks/useWorkoutPlan";

import WorkoutContext from "./WorkoutContext";

const WorkoutProvider = ({ children }) => {
  const [timer, setTimer] = useState(null);

  // A trick to not consider consecutive timers completed before time resets
  const [dirty, setDirty] = useState(false);

  const {
    plan,
    isLastTimer,
    currentTimerOptions,
    gotoFirstTimer,
    addTimer,
    removeTimer,
    nextTimer,
    prevTimer,
  } = useWorkoutPlan();

  const {
    paused,
    transpired,
    resumeClock,
    pauseClock,
    resetClock,
    setTranspired,
    restartClock,
  } = useClock();

  useEffect(() => {
    if (!currentTimerOptions) {
      setTimer(null);

      return;
    }

    const timer = createTimerSnapshot({
      transpired,
      options: currentTimerOptions,
      active: !paused,
    });

    setTimer(timer);
    setDirty(false);
  }, [transpired, paused, plan, currentTimerOptions]);

  useEffect(() => {
    if (
      !dirty &&
      timer &&
      !paused &&
      timer.progress.state === TimerState.COMPLETED
    ) {
      if (isLastTimer) {
        pauseClock();
      } else {
        setDirty(true);
        restartClock();
        nextTimer();
      }
    }
  }, [isLastTimer, dirty, paused, nextTimer, timer, restartClock, pauseClock]);

  const fastForwardTimer = () => {
    if (!timer) {
      return;
    }

    if (isLastTimer) {
      setTranspired(getTotalDuration(timer.options));
    } else {
      nextTimer();
      restartClock();
    }
  };

  const fastBackwardTimer = () => {
    prevTimer();
    resetClock();
  };

  const pauseWorkout = () => {
    pauseClock();
  };

  const resumeWorkout = () => {
    resumeClock();
  };

  const resetWorkout = () => {
    resetClock();
    gotoFirstTimer();
  };

  const resetTimer = () => {
    resetClock();
  };

  const restartTimer = () => {
    restartClock();
  };

  const value = {
    plan,
    restartTimer,
    pauseWorkout,
    resumeWorkout,
    resetWorkout,
    resetTimer,
    timer,
    fastForwardTimer,
    fastBackwardTimer,
    removeTimer: (id) => {
      removeTimer({ id });
    },
    addTimer: (options) => {
      addTimer({ options });
    },
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
