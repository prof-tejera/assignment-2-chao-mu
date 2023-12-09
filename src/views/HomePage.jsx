// Ours - Components
import WorkoutPlan from "@/components/workout/WorkoutPlan";
import WorkoutSummary from "@/components/workout/WorkoutSummary";
import Workout from "@/components/workout/Workout";

import useWorkoutContext from "@/contexts/workout/useWorkoutContext";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const { plan, timerSnapshot, removeTimer, isWorkoutActive } =
    useWorkoutContext();

  return (
    <div className={styles["home-page"]}>
      <Workout />
      <WorkoutPlan
        plan={plan}
        selectedTimerId={timerSnapshot && timerSnapshot.id}
        onRemove={(timer) => removeTimer(timer)}
        isWorkoutActive={isWorkoutActive}
      />
      <WorkoutSummary plan={plan} />
    </div>
  );
};

export default HomePage;
