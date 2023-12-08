// Ours - Components
import WorkoutPlan from "@/components/workout/WorkoutPlan";
import WorkoutSummary from "@/components/workout/WorkoutSummary";
import Workout from "@/components/workout/Workout";

import useWorkoutContext from "@/contexts/workout/useWorkoutContext";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const { plan, removeTimer } = useWorkoutContext();

  return (
    <div className={styles["home-page"]}>
      <Workout />
      <WorkoutPlan plan={plan} onRemove={(timer) => removeTimer(timer)} />
      <WorkoutSummary plan={plan} />
    </div>
  );
};

export default HomePage;
