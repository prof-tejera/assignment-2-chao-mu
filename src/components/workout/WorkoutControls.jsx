// react-icons
import {
  IoMdPlay,
  IoMdPause,
  IoMdSkipForward,
  IoMdSkipBackward,
} from "react-icons/io";

// Ours - Style
import styles from "./WorkoutControls.module.css";

// Ours - Context
import useWorkoutContext from "@/contexts/workout/useWorkoutContext";

// Ours - Types
import { TimerState } from "@/types/timer";

// Ours - Components
import Button from "@/components/form/Button";
import Hide from "@/components/ui/Hide";

const WorkoutControls = () => {
  const {
    timerSnapshot,
    pauseWorkout,
    resumeWorkout,
    resetWorkout,
    resetTimer,
    fastForwardTimer,
    fastBackwardTimer,
  } = useWorkoutContext();

  const state = timerSnapshot.progress.state;

  return (
    <div className={styles["workout-controls"]}>
      <div className={styles["workout-controls__basic"]}>
        <Button onClick={() => fastBackwardTimer()}>
          <IoMdSkipBackward />
        </Button>
        {state === TimerState.STOPPED && (
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
          <Button>
            <Hide>
              <IoMdPause />
            </Hide>
          </Button>
        )}
        <Button onClick={() => fastForwardTimer()}>
          <IoMdSkipForward />
        </Button>
      </div>
      <div className={styles["workout-controls__resets"]}>
        <Button onClick={resetTimer}>Reset Timer</Button>
        <Button onClick={resetWorkout}>Reset Workout</Button>
      </div>
    </div>
  );
};

export default WorkoutControls;
