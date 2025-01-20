"use client";

import ActionsContainer from "@/components/Actions";
import ExitStage from "@/components/ExitStage";
import { PauseIcon } from "@/components/icons/PauseIcon";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { Progress } from "@/components/ui/progress";
import { useFocusStore } from "@/stores/focusSessionStore";
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

export function FocusSessionStage() {
  const { focusTask } = useFocusStore();
  const setFocusTask = useFocusStore((state) => state.setFocusTask);
  const updateTask = useTasksStore((state) => state.updateTask);

  const { secondsLeft, endTime, paused, play, pause, percentComplete } = useTimer();

  const handleSubtaskCompleteClick = (subtask: Subtask) => {
    if (!focusTask) {
      return;
    }

    const updatedSubtask = { ...subtask, completed: !subtask.completed };
    const updatedTask = {
      ...focusTask,
      subtasks: (focusTask.subtasks ?? []).map((subtask) =>
        subtask.id === updatedSubtask.id ? updatedSubtask : subtask
      ),
    };

    handleTaskUpdate(updatedTask, updateTask);
    setFocusTask(updatedTask);

    const nextIncompleteSubtask = updatedTask.subtasks?.find((item) => !item.completed);
    if (nextIncompleteSubtask) {
      setSubtaskId(nextIncompleteSubtask.id);
    } else {
      setSubtaskId("");
    }
  };

  const firstIncompleteSubtaskId = focusTask?.subtasks?.find((subtask) => !subtask.completed)?.id;
  const [subtaskId, setSubtaskId] = useState<string>(firstIncompleteSubtaskId ?? "");

  const getSubtask = () => {
    if (!focusTask || !subtaskId) {
      return null;
    }
    return focusTask.subtasks?.find((subtask) => subtask.id === subtaskId);
  };

  return (
    <div className="flex flex-col h-[75vh] w-full relative">
      <header className="py-3">
        <Progress value={percentComplete()} />
        <div className="flex justify-center font-bold text-2xl underline underline-offset-8 my-5">
          {focusTask?.title}
        </div>
        <div className="flex justify-center gap-2 items-center">
          <Checkbox
            checked={getSubtask()?.completed}
            disabled={!subtaskId || subtaskId === ""}
            onCheckedChange={() => {
              if (!subtaskId || subtaskId === "") {
                return;
              }
              const subtask = getSubtask();
              if (subtask) {
                handleSubtaskCompleteClick(subtask);
              }
            }}
          />
          <Select
            onValueChange={(subtaskId) => setSubtaskId(subtaskId)}
            defaultValue={subtaskId}
            value={subtaskId}
          >
            <SelectTrigger className="w-[180px] border-none focus:outline-none focus:ring-0 data-[state=open]:ring-0">
              <SelectValue placeholder="Select a subtask" />
            </SelectTrigger>
            <SelectContent className="dark:bg-neutral-900/70 backdrop-blur-lg border dark:border-neutral-800 rounded-xl">
              <SelectGroup>
                {focusTask?.subtasks && focusTask.subtasks.length < 1 ? (
                  <div className="text-sm px-2">No subtasks created</div>
                ) : (
                  <div>
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
                  </div>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="flex justify-center place-items-center h-full">
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
