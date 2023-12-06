import WorkoutPlan from "@/components/workout/WorkoutPlan.jsx";
import Workout from "@/components/workout/Workout.jsx";
import Timer from "@/components/timer/Timer.jsx";
import TimerPreview from "@/components/timer/TimerPreview.jsx";
import TimerForm from "@/components/timer/TimerForm.jsx";

import styles from "./DocumentationPage.module.css";

const DocumentationPage = () => (
  <div className={styles["component-list"]}>
    <section>
      <h2>Workout Plan</h2>
      <WorkoutPlan />
    </section>
    <section>
      <h2>Workout</h2>
      <Workout />
    </section>
    <section>
      <h2>Timer</h2>
      <Timer />
    </section>
    <section>
      <h2>Timer Preview</h2>
      <TimerPreview />
    </section>
    <section>
      <h2>Timer Form</h2>
      <TimerForm />
    </section>
  </div>
);

export default DocumentationPage;
