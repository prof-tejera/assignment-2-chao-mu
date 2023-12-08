import TimeDisplay from "@/components/ui/TimeDisplay";

const TimerPreview = ({ options }) => (
  <span>
    {options.type} <TimeDisplay timeMs={options.workDuration} />x
    {options.rounds}
    {options.restDuration > 0 && (
      <span>
        &nbsp;(rest: <TimeDisplay timeMs={options.restDuration} />)
      </span>
    )}
  </span>
);

export default TimerPreview;
