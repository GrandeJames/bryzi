"use client";

import Actions from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import { PauseIcon } from "@/components/icons/PauseIcon";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { useTimer } from "@/hooks/useTimer";

export function Task() {
  const { secondsLeft, endTime, paused, play, pause } = useTimer();

  return (
    <div>
      <div className="font-semibold">
        <span className="text-9xl text-orange-400">{timerDisplay(secondsLeft).number}</span>{" "}
        {timerDisplay(getSecondsLeftUntilEndTime(endTime)).label} left
      </div>
      <div className="dark:text-gray-200 text-gray-700">
        {paused ? "Paused" : "Focus on your task. You got this!"}
      </div>
      <Actions>
        <ExitStage />
        <button
          className="dark:bg-neutral-800 bg-neutral-100 rounded-full p-2"
          onClick={paused ? play : pause}
        >
          {paused ? <PauseIcon className="text-orange-400" /> : <PlayIcon />}
        </button>
      </Actions>
    </div>
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
