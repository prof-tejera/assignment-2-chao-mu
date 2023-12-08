// react-icons
import {
  IoMdPlay,
  IoMdPause,
  IoMdSkipForward,
  IoMdSkipBackward,
  IoMdRefresh,
} from "react-icons/io";

// Ours - Style
import styles from "./WorkoutControls.module.css";

// Ours - Context
import useWorkoutContext from "@/contexts/workout/useWorkoutContext";

// Ours - Types
import { TimerState } from "@/types/timer";

// Ours - Components
import Button from "@/components/form/Button";

const WorkoutControls = () => {
  const {
    timer,
    pauseWorkout,
    resumeWorkout,
    resetWorkout,
    resetTimer,
    fastForwardTimer,
    fastBackwardTimer,
  } = useWorkoutContext();

  const state = timer.progress.state;

  return (
    <div className={styles["workout-controls"]}>
      <div className={styles["workout-controls__timer"]}>
        <Button onClick={() => fastBackwardTimer()}>
          <IoMdSkipBackward />
        </Button>
        {state === TimerState.PAUSED && (
          <Button onClick={() => resumeWorkout()}>
            <IoMdPlay />
          </Button>
        )}
        {state === TimerState.RUNNING && (
          <Button onClick={() => pauseWorkout()}>
            <IoMdPause />
          </Button>
        )}
        {state === TimerState.COMPLETED && (
          <Button onClick={() => resetTimer()}>
            <IoMdRefresh />
          </Button>
        )}
        <Button onClick={resetTimer}>Reset Timer</Button>
        <Button onClick={() => fastForwardTimer()}>
          <IoMdSkipForward />
        </Button>
      </div>
      <div className={styles["workout-controls__workout"]}>
        <Button onClick={resetWorkout}>Reset Workout</Button>
      </div>
    </div>
  );
};

export default WorkoutControls;
