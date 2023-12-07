import PropTypes from "prop-types";

import TimeDisplay from "@/components/ui/TimeDisplay";

const Timer = ({ title, round, activity, maxRounds, timeMs }) => {
  return (
    <section>
      <div>{title}</div>
      <div>
        Round {round} of {maxRounds}
      </div>
      <TimeDisplay timeMs={timeMs} />
      <div>{activity}</div>
    </section>
  );
};

Timer.propTypes = {
  round: PropTypes.number.isRequired,
  activity: PropTypes.string.isRequired,
  maxRounds: PropTypes.number.isRequired,
  timeMs: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Timer;
