import { useEffect } from "react";

import { useState } from "react";

import { getTotalDuration, TimerState } from "@/types/timer";

import { useClock } from "@/hooks/useClock";

import { createTimerSnapshot } from "@/types/timer";

import WorkoutContext from "./WorkoutContext";

const WorkoutProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [timer, setTimer] = useState(null);
  const [cursor, setCursor] = useState(0);

  const {
    paused,
    transpired,
    resumeClock,
    pauseClock,
    resetClock,
    restartClock,
    setTranspired,
  } = useClock();

  // We do this to avoid timer as a dependency on the useEffect below
  // which risks causing an infinite loop if progress is updated each time
  // this is not expected, but theoretically possible
  const timerDefined = timer != null;

  useEffect(() => {
    // Do we have an empty plan?
    if (plan.length === 0) {
      setTimer(null);
      setCursor(0);
      return;
    }

    const updatedTimer = createTimerSnapshot({
      options: plan[cursor],
      active: !paused,
      transpired,
    });
    setTimer(updatedTimer);

    // Did the timer complete?
    if (updatedTimer.progress.state === TimerState.COMPLETED) {
      const updatedCursor = cursor + 1;

      // Are we at the end of the plan?
      if (updatedCursor >= plan.length) {
        pauseClock();

        return;
      }

      // Next timer!
      setCursor(updatedCursor);
      restartClock();
    }
  }, [transpired, plan, cursor, resetClock, timerDefined, pauseClock, paused]);

  const fastForwardTimer = () => {
    const options = plan[cursor];
    if (!options) {
      return;
    }

    setTranspired(getTotalDuration(options));
  };

  /**
   * @param {import('@/types/timer').TimerOptions} timerOptions
   */
  const addTimer = (timerOptions) => {
    setPlan([...plan, timerOptions]);
  };

  /**
   * @param {number} id
   */
  const removeTimer = (id) => {
    const updatedPlan = plan.filter((timerOptions) => timerOptions.id !== id);

    setPlan(updatedPlan);
  };

  const pauseWorkout = () => {
    pauseClock();
  };

  const resumeWorkout = () => {
    resumeClock();
  };

  const resetWorkout = () => {
    resetClock();
    setCursor(0);
  };

  const resetTimer = () => {
    resetClock();
  };

  const value = {
    plan,
    addTimer,
    removeTimer,
    pauseWorkout,
    resumeWorkout,
    resetWorkout,
    resetTimer,
    timer,
    fastForwardTimer,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
