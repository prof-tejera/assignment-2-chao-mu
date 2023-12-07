import WorkoutPlan from "@/components/workout/WorkoutPlan";

import { useWorkoutContext } from "@/contexts/workout";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const { timers, removeTimer } = useWorkoutContext();

  return (
    <div className={styles["home-page"]}>
      <WorkoutPlan timers={timers} onRemove={(timer) => removeTimer(timer)} />
    </div>
  );
};

export default HomePage;
