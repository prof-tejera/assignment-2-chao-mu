import { createContext, useContext } from "react";

import PropTypes from "prop-types";

const WorkoutContext = createContext();

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  }

  return context;
};

// Workout Provider
const WorkoutProvider = ({ children }) => {
  const value = {};

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};

WorkoutProvider.propTypes = {
  children: PropTypes.node,
};

export { WorkoutProvider };
