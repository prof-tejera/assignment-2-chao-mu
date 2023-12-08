import TimeDisplay from "@/components/ui/TimeDisplay";

// Ours - Types
import { hasTimerFeature, TimerState } from "@/types/timer";

/**
 * @param {Object} props
 * @param {import('@/types/timer').TimerSnapshot} props.timer The timer
 *
 * @returns {JSX.Element}
 */
const TimerDisplay = ({ timer: { options, progress } }) => {
  const { rounds, type, countUp } = options;
  const { round, roundTranspired, isWorking, roundDuration, state } = progress;

  let displayState = "";
  if (state == TimerState.RUNNING) {
    displayState = isWorking ? "Work!" : "Rest";
  } else if (state == TimerState.PAUSED) {
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

  return (
    <section>
      <div>{type}</div>
      {hasTimerFeature(type, "rounds") && (
        <div>
          Round {round} of {rounds}
        </div>
      )}
      <TimeDisplay timeMs={displayedTranspired} showMs />
      <div>{displayState}</div>
    </section>
  );
};

export default TimerDisplay;
