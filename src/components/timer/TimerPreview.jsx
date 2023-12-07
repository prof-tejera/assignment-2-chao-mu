import TimeDisplay from "@/components/ui/TimeDisplay";

const TimerPreview = ({ timer }) => (
  <span>
    {timer.type} <TimeDisplay timeMs={timer.workDuration} />x{timer.rounds}
    {timer.restDuration > 0 && (
      <span>
        &nbsp;(rest: <TimeDisplay timeMs={timer.restDuration} />)
      </span>
    )}
  </span>
);

export default TimerPreview;
