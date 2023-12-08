import { useEffect } from "react";

import { createContext, useContext, useState } from "react";

import { getTimerProgress, getTotalDuration } from "@/types/timer";

import { useClock } from "@/hooks/useClock";

import { createTimer } from "@/types/timer";

const WorkoutContext = createContext(null);

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  }

  return context;
};

export const WorkoutProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [timer, setTimer] = useState(null);
  const [cursor, setCursor] = useState(0);

  const {
    paused,
    transpired,
    resumeClock,
    pauseClock,
    resetClock,
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

    // Do we have a plan, but no defined timer?
    if (!timerDefined) {
      setTimer(createTimer(plan[cursor]));
      return;
    }

    // Are we paused?
    if (paused) {
      return;
    }

    console.log("progress", transpired);

    // Check the timer's progress
    const options = plan[cursor];
    const progress = getTimerProgress({ options, transpired });

    // Did the timer complete?
    if (progress.isCompleted) {
      const newCursor = cursor + 1;
      if (newCursor >= plan.length) {
        pauseClock();

        setTimer((timer) => ({ ...timer, progress }));

        return;
      }

      // Let useEffect update the timer
      setCursor(newCursor);
      setTimer(null);
      resetClock();

      return;
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
    if (plan.length === 0) {
      setTimer();
    }
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
