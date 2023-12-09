// Ours - Components
import WorkoutPlan from "@/components/workout/WorkoutPlan";
import WorkoutSummary from "@/components/workout/WorkoutSummary";
import TimerDisplayPlaceholder from "@/components/timer/TimerDisplayPlaceholder";
import TimerDisplay from "@/components/timer/TimerDisplay";
import WorkoutControls from "@/components/workout/WorkoutControls";

// Ours - Context
import useWorkoutContext from "@/contexts/workout/useWorkoutContext";

// Ours - Style
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { plan, timerSnapshot, removeTimer, isWorkoutActive } =
    useWorkoutContext();

  const showPlaceholder = timerSnapshot === null;

  return (
    <div className={styles["home-page"]}>
      {showPlaceholder ? (
        <>
          <div />
          <TimerDisplayPlaceholder />
          <div />
        </>
      ) : (
        <>
          <div className={styles.overview}>
            <WorkoutPlan
              plan={plan}
              selectedTimerId={timerSnapshot && timerSnapshot.id}
              onRemove={(timer) => removeTimer(timer)}
              isWorkoutActive={isWorkoutActive}
            />
            <WorkoutSummary plan={plan} />
          </div>
          <TimerDisplay timerSnapshot={timerSnapshot} />
          <div className={styles["control-column"]}>
            <WorkoutControls />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
