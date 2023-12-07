import WorkoutPlan from "@/components/workout/WorkoutPlan";
import Workout from "@/components/workout/Workout";
import Timer from "@/components/timer/Timer";
import TimerPreview from "@/components/timer/TimerPreview";
import TimerForm from "@/components/timer/TimerForm";
import TimeDisplay from "@/components/timer/TimeDisplay";

import styles from "./DocumentationPage.module.css";

const docs = [
  {
    comp: WorkoutPlan,
    name: "WorkoutPlan",
    props: {},
  },
  {
    comp: Workout,
    name: "Workout",
    props: {},
  },
  {
    comp: Timer,
    name: "Timer",
    props: {
      timeMs: 34250,
      round: 1,
      maxRounds: 3,
      activity: "Work",
      title: "TABATA",
    },
  },
  {
    comp: TimerPreview,
    name: "TimerPreview",
    props: {},
  },
  {
    comp: TimerForm,
    name: "TimerForm",
    props: {
      onSubmit: (options) => console.log(options),
    },
  },
  {
    comp: TimeDisplay,
    name: "TimeDisplay",
    props: { timeMs: 34250 },
  },
];

const DocumentationPage = () => (
  <div className={styles["component-list"]}>
    {docs.map(({ comp: Comp, name, props }) => {
      return (
        <section key={name}>
          <h2>{`<${name}>`}</h2>
          <Comp {...props} />
        </section>
      );
    })}
  </div>
);

export default DocumentationPage;
