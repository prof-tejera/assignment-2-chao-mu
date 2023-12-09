// react-rounter-dom
import { Link } from "react-router-dom";

// Ours - Components
import TimerDisplay from "@/components/timer/TimerDisplay";
import WorkoutControls from "./WorkoutControls";

// Ours - Context
import useWorkoutContext from "@/contexts/workout/useWorkoutContext";

// Ours - Style
import styles from "./Workout.module.css";

const Workout = () => {
  const { timerSnapshot } = useWorkoutContext();

  if (!timerSnapshot) {
    return (
      <div className={styles["missing-timer"]}>
        <Link to="/add">Add</Link> a timer to get started
      </div>
    );
  }

  return (
    <section className={styles.workout}>
      <TimerDisplay timerSnapshot={timerSnapshot} />
      <WorkoutControls />
    </section>
  );
};

export default Workout;
