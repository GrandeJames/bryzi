import Actions from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import { useEffect, useRef, useState } from "react";

const TASK_TIME_MINUTES = 90;

function Task({
  onComplete,
  handleExitStage,
}: {
  onComplete: () => void;
  handleExitStage: () => void;
}) {
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

      <Actions>
        <ExitStage handleExitStage={handleExitStage} />
        <button className="bg-neutral-800 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-orange-400"
          >
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Actions>
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
