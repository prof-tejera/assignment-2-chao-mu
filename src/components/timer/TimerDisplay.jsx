import TimeDisplay from "@/components/ui/TimeDisplay";

/**
 * @param {Object} props
 * @param {import('@/types/timer').TimerOptions} props.options The timer's configuration
 * @param {import('@/types/timer').TimerProgress} props.progress The timer's progress
 *
 * @returns {JSX.Element}
 */
const TimerDisplay = ({ options, progress }) => {
  const { rounds, type, countUp } = options;
  const { round, roundTranspired, isWorking, roundDuration } = progress;

  const activity = isWorking ? "Work" : "Rest";
  const displayedTranspired = countUp
    ? roundTranspired
    : roundDuration - roundTranspired;

  return (
    <section>
      <div>{type}</div>
      <div>
        Round {round} of {rounds}
      </div>
      <TimeDisplay timeMs={displayedTranspired} />
      <div>{activity}</div>
    </section>
  );
};

export default TimerDisplay;
