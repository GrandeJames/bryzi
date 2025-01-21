"use client";

import ActionsContainer from "@/components/Actions";
import DiscardSessionButton from "@/app/(focus-stages)/DiscardSessionButton";
import { PauseIcon } from "@/components/icons/PauseIcon";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { Progress } from "@/components/ui/progress";
import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { useTimer } from "@/hooks/useTimer";
import { Checkbox } from "@/components/ui/checkbox";
import { Subtask } from "@/types/subtask";
import { handleTaskUpdate } from "@/lib/taskUtils";
import useTasksStore from "@/stores/tasksStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function TimerStage() {
  const focusTask = useFocusSessionStore((state) => state.sessionTask);
  const setFocusTask = useFocusSessionStore((state) => state.setSessionTask);
  const updateTask = useTasksStore((state) => state.updateTask);

  const { secondsLeft, endTime, paused, play, pause, percentComplete } = useTimer();

  // The Select component uses string values for the selected item, so storing subtaskId instead of the subtask object
  const [subtaskId, setSubtaskId] = useState<string>(
    focusTask?.subtasks?.find((subtask) => !subtask.completed)?.id ?? ""
  );

  const getSubtask = () => focusTask?.subtasks?.find((subtask) => subtask.id === subtaskId);

  const handleSubtaskToggle = () => {
    if (!focusTask || !subtaskId) {
      return;
    }

    const updatedSubtask = { ...getSubtask()!, completed: !getSubtask()!.completed };
    const updatedTask = {
      ...focusTask,
      subtasks: (focusTask.subtasks ?? []).map((subtask) =>
        subtask.id === updatedSubtask.id ? updatedSubtask : subtask
      ),
    };

    handleTaskUpdate(updatedTask, updateTask);
    setFocusTask(updatedTask);

    const nextIncompleteSubtask =
      updatedTask.subtasks.find((subtask) => !subtask.completed)?.id || "";
    setSubtaskId(nextIncompleteSubtask);
  };

  return (
    <div className="flex flex-col h-[75vh] w-full relative">
      <header className="py-3">
        <Progress value={percentComplete()} />
        <div className="text-center font-bold text-2xl underline underline-offset-8 my-5">
          {focusTask?.title}
        </div>
        {(focusTask?.subtasks?.length || 0) > 0 && (
          <div className="flex justify-center gap-2 items-center">
            <Checkbox
              checked={getSubtask()?.completed}
              disabled={!subtaskId}
              onCheckedChange={handleSubtaskToggle}
            />
            <Select value={subtaskId} onValueChange={setSubtaskId} defaultValue={subtaskId}>
              <SelectTrigger className="w-[180px] border-none focus:outline-none focus:ring-0">
                <SelectValue placeholder="Select a subtask" />
              </SelectTrigger>
              <SelectContent className="dark:bg-neutral-900/70 backdrop-blur-lg border dark:border-neutral-800 rounded-xl">
                <SelectGroup>
                  {focusTask?.subtasks?.map((subtask: Subtask) => (
                    <SelectItem
                      key={subtask.id}
                      value={subtask.id}
                      className={subtask.completed ? "line-through dark:text-neutral-400" : ""}
                      onClick={() => {
                        setSubtaskId(subtask.id);
                      }}
                    >
                      {subtask.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </header>
      <main className="flex justify-center place-items-center h-full">
        <div className="text-center">
          <div className="font-semibold">
            <span className="text-[13rem] leading-none text-orange-400">
              {timerDisplay(secondsLeft).number}
            </span>{" "}
            {timerDisplay(getSecondsLeftUntilEndTime(endTime)).label} left
          </div>
          <div className="dark:text-gray-200 text-gray-700">
            {paused ? "Paused" : "Focus on your task. You got this!"}
          </div>
        </div>
      </main>
      <ActionsContainer>
        <button className="bg-neutral-800 rounded-full size-9">✔</button>
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

function timerDisplay(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return minutes > 0
    ? { number: minutes, label: minutes === 1 ? "minute" : "minutes" }
    : { number: seconds, label: seconds === 1 ? "second" : "seconds" };
}

export default TimerStage;