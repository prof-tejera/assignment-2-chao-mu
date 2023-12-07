import { useForm, FormProvider } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";

import TimeInput from "@/components/form/TimeInput";
import PositiveIntegerInput from "@/components/form/PositiveIntegerInput";
import Select from "@/components/form/Select";
import Button from "@/components/form/Button";

import styles from "./TimerForm.module.css";

// See @/types/TimerOptions for what we are creating
const timerTypes = {
  Stopwatch: {
    userProvided: ["workDuration"],
    constants: {
      restDuration: 0,
      rounds: 1,
      countUp: true,
    },
  },
  Countdown: {
    userProvided: ["workDuration"],
    constants: {
      restDuration: 0,
      rounds: 1,
      countUp: false,
    },
  },
  XY: {
    userProvided: ["workDuration", "rounds"],
    constants: {
      restDuration: 0,
      countUp: false,
    },
  },
  TABATA: {
    userProvided: ["workDuration", "restDuration", "rounds"],
    constants: {
      countUp: false,
    },
  },
};

const TimerForm = ({ onSubmit }) => {
  const formMethods = useForm({
    defaultValues: {
      timerType: "Stopwatch",
    },
  });

  const { handleSubmit, watch } = formMethods;

  const timerType = watch("timerType");
  const enabledFields = timerType ? timerTypes[timerType].userProvided : [];

  const onSubmitWrapper = (data) => {
    const { userProvided, constants } = timerTypes[timerType];

    const userProvidedData = Object.fromEntries(
      userProvided.map((key) => [key, data[key]]),
    );

    const timerOptions = {
      ...userProvidedData,
      ...constants,
      id: uuidv4(),
    };

    onSubmit(timerOptions);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmitWrapper)} className={styles.form}>
        <Select
          label="Timer Type"
          name="timerType"
          options={Object.keys(timerTypes)}
        />

        {enabledFields.includes("workDuration") && (
          <TimeInput label="Work Duration" name="workDuration" />
        )}
        {enabledFields.includes("restDuration") && (
          <TimeInput label="Rest Duration" name="restDuration" />
        )}
        {enabledFields.includes("rounds") && (
          <PositiveIntegerInput required={true} label="Rounds" name="rounds" />
        )}
        <Button type="submit">Save</Button>
      </form>
    </FormProvider>
  );
};

export default TimerForm;
