"use client";

import Actions from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import { useTimer } from "@/hooks/useTimer";

interface TaskProps {
  onComplete: () => void;
  handleExitStage: () => void;
}

export function Task({ onComplete, handleExitStage }: TaskProps) {
  const { secondsLeft, endTime, paused, play, pause } = useTimer(onComplete);

  return (
    <>
      <div className="font-semibold">
        <span className="text-9xl text-orange-400">{timerDisplay(secondsLeft).number}</span>{" "}
        {timerDisplay(getSecondsLeftUntilEndTime(endTime)).label} left
      </div>

      <div className="dark:text-gray-200 text-gray-700">
        {paused ? "Paused" : "Focus on your task. You got this!"}
      </div>

      <Actions>
        <ExitStage handleExitStage={handleExitStage} />
        {paused ? (
          <button className="dark:bg-neutral-800 bg-neutral-100 rounded-full p-2" onClick={play}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-orange-400"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button className="dark:bg-neutral-800 bg-neutral-100 rounded-full p-2" onClick={pause}>
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
        )}
      </Actions>
    </>
  );
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
