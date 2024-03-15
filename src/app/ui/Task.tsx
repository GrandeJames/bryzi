import { useEffect, useRef, useState } from "react";

const TASK_TIME_MINUTES = 90;

function Task({ onComplete }: { onComplete: () => void }) {
  const endTimeRef = useRef(new Date().getTime() + TASK_TIME_MINUTES * 60 * 1000);
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft(endTimeRef.current));

  useEffect(() => {
    const interval = setInterval(() => {
      const secondsLeft = getSecondsLeft(endTimeRef.current);

      if (secondsLeft <= 0) {
        document.title = "Time's up!";
        onComplete();
        return;
      }

      document.title = `${timerDisplay(secondsLeft).number} ${
        timerDisplay(secondsLeft).label
      } left`;
      setSecondsLeft(secondsLeft);
    }, 500);

    return () => {
      clearInterval(interval);
      document.title = "focus";
    };
  }, [onComplete]);

  return (
    <>
      <div className="font-semibold">
        <span className="text-9xl text-orange-400">{timerDisplay(secondsLeft).number}</span>{" "}
        {timerDisplay(getSecondsLeft(endTimeRef.current)).label} left
      </div>
      <div className="text-gray-200">Focus on your task. You got this!</div>
    </>
  );
}

function getSecondsLeft(endTime: number) {
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

export default Task;
