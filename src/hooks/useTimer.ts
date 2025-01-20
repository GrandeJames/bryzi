import { useEffect, useState } from "react";
import { useFocusStore } from "../stores/focusSessionStore";

const TASK_TIME_MINUTES = 90;

export function useTimer() {
  const { complete } = useFocusStore();

  const [endTime, setEndTime] = useState(new Date().getTime() + TASK_TIME_MINUTES * 60 * 1000);
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeftUntilEndTime(endTime));
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        return;
      }

      const secondsLeft = getSecondsLeftUntilEndTime(endTime);

      setSecondsLeft(secondsLeft);

      if (secondsLeft <= 0) {
        document.title = "Time's up! | Focus";
        complete();
        return;
      }

      document.title = `${timerDisplay(secondsLeft).number} ${
        timerDisplay(secondsLeft).label
      } left | Focus`;
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [endTime, complete, paused]);

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

  return { endTime, secondsLeft, paused, pause, play, percentComplete};
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