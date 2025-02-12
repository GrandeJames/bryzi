import { useEffect, useState } from "react";
import { useFocusSessionStore } from "../stores/focusSessionStore";
import { handleSessionSave } from "@/lib/focusSessionUtils";
import useTasksStore from "@/stores/tasksStore";
import { ClassTask } from "@/types/classTask";
import { useFocusTrackerStore } from "@/stores/focusTrackerStore";

const TASK_TIME_MINUTES = 90;

export function useTimer(task: ClassTask) {
  const reset = useFocusSessionStore((state) => state.reset);
  const updateTask = useTasksStore((state) => state.updateTask);

  const [endTime, setEndTime] = useState(new Date().getTime() + TASK_TIME_MINUTES * 60 * 1000);
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeftUntilEndTime(endTime));
  const [paused, setPaused] = useState(false);

  const [temporaryStartDate, setTemporaryStartDate] = useState<Date | null>(new Date());
  const focusTask = useFocusSessionStore((state) => state.sessionTask);
  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        return;
      }

      const secondsLeft = getSecondsLeftUntilEndTime(endTime);

      setSecondsLeft(secondsLeft);

      if (secondsLeft <= 0) {
        document.title = "Time's up! | Focus";

        if (temporaryStartDate !== null) {
          const addTemporaryFocusEntry = useFocusTrackerStore.getState().addTemporaryFocusEntry;

          addTemporaryFocusEntry({
            startDate: temporaryStartDate,
            endDate: new Date(),
            taskId: focusTask!.id,
          });

          setTemporaryStartDate(null);
        }
        handleSessionSave(reset, task, updateTask);
        return;
      }

      document.title = `${timerDisplay(secondsLeft).number} ${
        timerDisplay(secondsLeft).label
      } left | Focus`;
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [endTime, paused, reset, task, updateTask]);

  const pause = () => {
    setPaused(true);
    document.title = "Paused | Focus";
  };

  const play = () => {
    setPaused(false);
    setEndTime(new Date().getTime() + secondsLeft * 1000);
  };

  const percentComplete = () => {
    const totalSeconds = TASK_TIME_MINUTES * 60;
    const remainingSeconds = secondsLeft;
    const percent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    return percent;
  };

  return { endTime, secondsLeft, paused, pause, play, percentComplete };
}

function getSecondsLeftUntilEndTime(endTime: number) {
  const now = new Date().getTime();
  const secondsLeft = Math.floor((endTime - now) / 1000);
  return secondsLeft;
}

const timerDisplay = (seconds: number) => {
  if (seconds > 60) {
    const number = Math.floor(seconds / 60);
    const label = number === 1 ? "minute" : "minutes";

    return { number, label };
  } else {
    const label = seconds === 1 ? "second" : "seconds";

    return { number: seconds, label };
  }
};
