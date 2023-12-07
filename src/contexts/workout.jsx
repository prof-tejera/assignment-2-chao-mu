import { createContext, useContext, useState } from "react";

const WorkoutContext = createContext();

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  }

  return context;
};

export const WorkoutProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);

  const addTimer = (timer) => {
    setTimers([...timers, timer]);
  };

  const removeTimer = ({ id }) => {
    const updatedTimers = timers.filter((timer) => timer.id !== id);
    setTimers(updatedTimers);
  };

  const value = {
    timers,
    addTimer,
    removeTimer,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};
