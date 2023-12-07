import PropTypes from "prop-types";

import { padTime, splitTimeMs } from "@/utils/time.js";

const TimeDisplay = ({ timeMs }) => {
  const { minutes, seconds, ms } = splitTimeMs(timeMs);

  return (
    <time>
      {padTime(minutes)}:{padTime(seconds)}.{padTime(ms, 3)}
    </time>
  );
};

TimeDisplay.propTypes = {
  timeMs: PropTypes.number.isRequired,
};

export default TimeDisplay;
