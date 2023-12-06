/**
 * @typedef {Object} TimerOptions
 * @property {string} type - Type of timer (Stopwatch, Countdown, XY, TABATA).
 * @property {number} workDuration - Duration of work period in seconds.
 * @property {number} restDuration - Duration of rest period in seconds.
 * @property {number} rounds - Number of rounds.
 * @property {boolean} countUp - Indicates if the timer counts up (true for Stopwatch).
 */

/**
 * Create options for a Stopwatch timer.
 * @param {number} duration - Duration of the stopwatch timer in seconds.
 * @returns {TimerOptions} - Stopwatch timer options.
 */
export const createStopwatch = (duration) => ({
  type: "Stopwatch",
  workDuration: duration,
  restDuration: 0,
  rounds: 1,
  countUp: true,
});

/**
 * Create options for a Countdown timer.
 * @param {number} duration - Duration of the countdown timer in seconds.
 * @returns {TimerOptions} - Countdown timer options.
 */
export const createCountdown = (duration) => ({
  type: "Countdown",
  workDuration: duration,
  restDuration: 0,
  rounds: 1,
  countUp: false,
});

/**
 * Create options for an XY timer.
 * @param {number} duration - Duration of each round in seconds.
 * @param {number} rounds - Number of rounds.
 * @returns {TimerOptions} - XY timer options.
 */
export const createXY = (duration, rounds) => ({
  type: "XY",
  workDuration: duration,
  restDuration: 0,
  rounds: rounds,
  countUp: false,
});

/**
 * Create options for a TABATA timer.
 * @param {number} workDuration - Duration of work period in seconds.
 * @param {number} restDuration - Duration of rest period in seconds.
 * @param {number} totalRounds - Total number of rounds.
 * @returns {TimerOptions} - TABATA timer options.
 */
export const createTabata = (workDuration, restDuration, totalRounds) => ({
  type: "TABATA",
  workDuration: workDuration,
  restDuration: restDuration,
  rounds: totalRounds,
  countUp: false,
});
