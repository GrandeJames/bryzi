import Actions from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import { useEffect, useState } from "react";

const TASK_TIME_MINUTES = 90;

export function useTimer(onComplete: () => void) {
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
        document.title = "Time's up!";
        onComplete();
        return;
      }

      document.title = `${timerDisplay(secondsLeft).number} ${
        timerDisplay(secondsLeft).label
      } left`;
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [endTime, onComplete, paused]);

  const pause = () => {
    setPaused(true);
    document.title = "Paused";
  };

  const play = () => {
    setPaused(false);
    setEndTime(new Date().getTime() + secondsLeft * 1000);
  };

  return { endTime, secondsLeft, paused, pause, play };
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
