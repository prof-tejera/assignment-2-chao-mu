import styles from "./WorkoutPlan.module.css";

import TimeDisplay from "@/components/ui/TimeDisplay";
import Button from "@/components/form/Button";

/**
 * @param {Object} props
 * @param {Array.<import('@/types/timer').TimerOptions>} props.plan
 * @param {function(string): void} props.onRemove
 * @returns {JSX.Element}
 */
const WorkoutPlan = ({ plan, onRemove }) => {
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
          {plan.length === 0 && (
            <tr>
              <td className={styles["no-timers"]} colSpan={5}>
                No timers added yet
              </td>
            </tr>
          )}
          {plan.map((options, index) => (
            <tr key={index}>
              <td>{options.type}</td>
              <td>
                <TimeDisplay timeMs={options.workDuration} />
              </td>
              <td>
                {options.restDuration > 0 && (
                  <TimeDisplay timeMs={options.restDuration} />
                )}
              </td>
              <td>{options.rounds}</td>
              <td>
                <Button onClick={() => onRemove(options.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default WorkoutPlan;
