import styles from "./WorkoutPlan.module.css";

import TimeDisplay from "@/components/ui/TimeDisplay";
import Button from "@/components/form/Button";

const WorkoutPlan = ({ timers, onRemove }) => {
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
    </section>
  );
};

export default WorkoutPlan;
