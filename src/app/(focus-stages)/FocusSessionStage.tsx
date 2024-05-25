"use client";

import ActionsContainer from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import { PauseIcon } from "@/components/icons/PauseIcon";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { Progress } from "@/components/ui/progress";
import { useTimer } from "@/hooks/useTimer";

export function FocusSessionStage() {
  const { secondsLeft, endTime, paused, play, pause, percentComplete } = useTimer();

  return (
    <div className="h-full w-full">
      <header>
        <Progress value={percentComplete()} />
        <div className="flex justify-center font-bold text-2xl underline underline-offset-8 my-5">
          Code
        </div>
      </header>

      <div className="flex justify-center h-full place-items-center">
        <div>
          <div className="font-semibold">
            <span className="text-[13rem] leading-none text-orange-400">
              {timerDisplay(secondsLeft).number}
            </span>{" "}
            {timerDisplay(getSecondsLeftUntilEndTime(endTime)).label} left
          </div>
          <div className="dark:text-gray-200 text-gray-700 flex justify-center">
            {paused ? "Paused" : "Focus on your task. You got this!"}
          </div>
        </div>
      </div>
      <ActionsContainer>
        <ExitStage />
        <button
          className="dark:bg-neutral-800 bg-neutral-100 rounded-full p-2"
          onClick={paused ? play : pause}
        >
          {paused ? <PauseIcon className="text-orange-400" /> : <PlayIcon />}
        </button>
      </ActionsContainer>
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
