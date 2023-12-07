import styles from "./WorkoutPlan.module.css";
import { timeInWords } from "@/utils/time";

import TimeDisplay from "@/components/ui/TimeDisplay";
import Button from "@/components/form/Button";

const WorkoutPlan = ({ timers, onRemove }) => {
  const totalWork = timers.reduce(
    (acc, current) => acc + current.rounds * current.workDuration,
    0,
  );
  const totalRest = timers.reduce(
    (acc, current) => acc + current.rounds * current.restDuration,
    0,
  );
  const totalRounds = timers.reduce((acc, current) => acc + current.rounds, 0);

  return (
    <section className={styles["workout-plan"]}>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Work Duration</th>
            <th>Rest Duration</th>
            <th>Rounds</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {timers.length === 0 && (
            <tr>
              <td className={styles["no-timers"]} colSpan="5">
                No timers added yet
              </td>
            </tr>
          )}
          {timers.map((timer, index) => (
            <tr key={index}>
              <td>{timer.type}</td>
              <td>
                <TimeDisplay timeMs={timer.workDuration} />
              </td>
              <td>
                {timer.restDuration > 0 && (
                  <TimeDisplay timeMs={timer.restDuration} />
                )}
              </td>
              <td>{timer.rounds}</td>
              <td>
                <Button onClick={() => onRemove(timer)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.summary}>
        <div>
          <div>Rounds</div>
          <div>{totalRounds}</div>
          <div>Work Time</div>
          <div>{timeInWords(totalWork)}</div>
          <div>Rest Time</div>
          <div>{timeInWords(totalRest)}</div>
          <div>Total Time</div>
          <div>{timeInWords(totalWork + totalRest)}</div>
        </div>
        <div>
          <Button to="/add">Add Timer</Button>
        </div>
      </div>
    </section>
  );
};

export default WorkoutPlan;
