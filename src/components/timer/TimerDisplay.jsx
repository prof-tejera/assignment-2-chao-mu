import TimeDisplay from "@/components/ui/TimeDisplay";

// Ours - Components
import Progress from "@/components/ui/Progress";

// Ours - Types
import { hasTimerFeature, TimerState } from "@/types/timer";

// Ours - Style
import styles from "./TimerDisplay.module.css";

/**
 * @param {Object} props
 * @param {import('@/types/timer').TimerSnapshot} props.timerSnapshot a snapshot of the timer
 *
 * @returns {JSX.Element}
 */
const TimerDisplay = ({ timerSnapshot }) => {
  const { options, progress } = timerSnapshot;
  const { rounds, type, countUp } = options;
  const {
    round,
    roundTranspired,
    isWorking,
    roundDuration,
    state,
    roundProgress,
    totalProgress,
  } = progress;

  let displayState = "";
  if (state == TimerState.RUNNING) {
    displayState = isWorking ? "Work!" : "Rest";
  } else if (state == TimerState.STOPPED) {
    displayState = "Paused";
  } else if (state == TimerState.COMPLETED) {
    displayState = "Completed";
  } else {
    throw new Error(
      `Unable to calculate timer display state. state=${state}, isWorking=${isWorking}`,
    );
  }

  const displayedTranspired = countUp
    ? roundTranspired
    : roundDuration - roundTranspired;

  const hasRoundFeature = hasTimerFeature(type, "rounds");

  return (
    <section className={styles["timer-display"]}>
      <div className={styles["timer-display__type"]}>{type}</div>
      <div className={styles["timer-display__time"]}>
        <TimeDisplay timeMs={displayedTranspired} showMs />
      </div>
      <div className={styles.subgroup}>
        {hasRoundFeature && (
          <div className={styles["timer-display__rounds"]}>
            Round {round} of {rounds}
          </div>
        )}
        <div className={styles["timer-display__state"]}>{displayState}</div>
      </div>

      <div className={styles["timer-display__progress"]}>
        {hasRoundFeature && <Progress max={1} value={roundProgress} />}
        <Progress max={1} value={totalProgress} />
      </div>
    </section>
  );
};

export default TimerDisplay;
