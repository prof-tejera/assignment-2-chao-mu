/**
 * @typedef {Object} TimerOptions
 * @property {string} id - Unique identifier of the timer.
 * @property {string} type - Type of timer (e.g. Stopwatch, Countdown, XY, TABATA).
 * @property {number} workDuration - Duration of work period in miliseconds.
 * @property {number} restDuration - Duration of rest period in miliseconds.
 * @property {number} rounds - Number of rounds.
 * @property {boolean} countUp - Indicates if the timer counts up
 */

/**
 * @typedef {Object} TimerProgress
 * @property {string} id - Unique identifier of the timer.
 * @property {number} completedRounds - Number of completed rounds.
 * @property {number} round - Current round
 * @property {number} roundDuration - Current round's duration
 * @property {number} roundProgress - Progress of current round.
 * @property {number} totalProgress - Progress of all rounds.
 * @property {boolean} isWorking - Indicates if the timer is in work period.
 * @property {boolean} isCompleted - Indicates if all rounds have been completed
 * @property {number} roundTranspired - Time remaining in current round.
 */

/**
 * @typedef {Object} Timer
 * @property {TimerOptions} options - Options of the timer.
 * @property {TimerProgress} progress - Progress of the timer.
 */

/**
 * @param {TimerOptions} options - Options of the timer.
 * @returns {Timer} Timer object.
 */
export const createTimer = (options) => ({
  options,
  progress: getTimerProgress({
    options,
    transpired: 0,
  }),
});

/**
 * Returns the progress of the timer given transpired time.
 *
 * @param {Object} params
 * @param {TimerOptions} params.options - Options of the timer.
 * @param {number} params.transpired - Time transpired in miliseconds.
 *
 * @returns {TimerProgress} Progress of the timer.
 */
export const getTimerProgress = ({ options, transpired }) => {
  const { workDuration, restDuration, rounds, id } = options;
  const msPerRound = workDuration + restDuration;

  const completedRoundsExact = transpired / msPerRound;
  const completedRounds = Math.floor(completedRoundsExact);

  const roundTranspired = (completedRoundsExact - completedRounds) * msPerRound;
  const isWorking = roundTranspired < workDuration;

  const roundProgress =
    roundTranspired / (isWorking ? workDuration : restDuration);
  const totalProgress = (completedRounds + roundProgress) / rounds;

  const round = completedRounds + 1;

  return {
    id,
    completedRounds,
    roundProgress,
    totalProgress,
    isWorking,
    roundTranspired,
    isCompleted: round >= rounds,
    round: Math.min(round, rounds),
    roundDuration: isWorking ? workDuration : restDuration,
  };
};

/**
 * Returns the total duration of the timer.
 * @param {Object} params
 * @param {TimerOptions} params.options - Options of the timer.
 * @returns {number} Total duration of the timer.
 **/
export const getTotalDuration = ({ options }) => {
  const { workDuration, restDuration, rounds } = options;

  return (workDuration + restDuration) * rounds;
};
