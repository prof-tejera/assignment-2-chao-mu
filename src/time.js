const msPerSecond = 1000;
const msPerMinute = msPerSecond * 60;
const msPerHour = msPerMinute * 60;

export const padTime = (t, digits = 2) => t.toString().padStart(digits, "0");

export const splitTimeMs = (timeMs) => {
  // Convert to hours, truncate the remainder.
  const hoursExact = timeMs / msPerHour;
  const hours = Math.floor(hoursExact);

  // Take the remainder from before and convert to minutes
  const minutesExact = (hoursExact - hours) * 60;
  const minutes = Math.floor(minutesExact);

  // Take the remainder from before and convert to seconds
  const secondsExact = (minutesExact - minutes) * 60;
  const seconds = Math.floor(secondsExact);

  const ms = Math.floor((secondsExact - seconds) * 1000);

  return { hours, minutes, seconds, ms };
};

export const joinTimeMs = ({ hours, minutes, seconds }) => {
  return hours * msPerHour + minutes * msPerMinute + seconds * msPerSecond;
};
